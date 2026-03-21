import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import type { AuthUser } from "../../types/auth";

interface Place {
  id: string;
  place_id: string;
  name: string;
  address: string;
  manager_id?: string | null;
}

interface LocateItem {
  id: string;
  locate_id: string;
  place_id: string;
  building_name: string;
  floor: string;
  room: string;
}

interface DraftStructure {
  [buildingName: string]: string[];
}

interface AdminPlaceWorkspaceProps {
  currentUser: AuthUser;
}

const getDraftKey = (placeId: string) => `tinypoop.admin.structure.${placeId}`;

const getUniqueSorted = (items: string[]) =>
  Array.from(new Set(items.map((item) => item.trim()).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );

const AdminPlaceWorkspace: React.FC<AdminPlaceWorkspaceProps> = ({ currentUser }) => {
  const { placeId } = useParams<{ placeId: string }>();
  const decodedPlaceId = decodeURIComponent(placeId ?? "");

  const [assignedPlaces, setAssignedPlaces] = useState<Place[]>([]);
  const [locates, setLocates] = useState<LocateItem[]>([]);
  const [draftStructure, setDraftStructure] = useState<DraftStructure>({});
  const [loading, setLoading] = useState(true);

  const [newBuilding, setNewBuilding] = useState("");
  const [buildingForFloor, setBuildingForFloor] = useState("");
  const [newFloor, setNewFloor] = useState("");
  const [buildingForRoom, setBuildingForRoom] = useState("");
  const [floorForRoom, setFloorForRoom] = useState("");
  const [newRoom, setNewRoom] = useState("");

  const selectedPlace = useMemo(
    () => assignedPlaces.find((place) => place.place_id === decodedPlaceId),
    [assignedPlaces, decodedPlaceId]
  );

  const buildingOptions = useMemo(() => {
    const fromLocates = locates.map((item) => item.building_name);
    const fromDraft = Object.keys(draftStructure);
    return getUniqueSorted([...fromLocates, ...fromDraft]);
  }, [draftStructure, locates]);

  const floorOptionsForRoom = useMemo(() => {
    if (!buildingForRoom) {
      return [];
    }

    const fromLocates = locates
      .filter((item) => item.building_name === buildingForRoom)
      .map((item) => item.floor);
    const fromDraft = draftStructure[buildingForRoom] ?? [];

    return getUniqueSorted([...fromLocates, ...fromDraft]);
  }, [buildingForRoom, draftStructure, locates]);

  const groupedData = useMemo(() => {
    const grouped: Record<string, Record<string, LocateItem[]>> = {};

    buildingOptions.forEach((buildingName) => {
      if (!grouped[buildingName]) {
        grouped[buildingName] = {};
      }

      const knownFloors = getUniqueSorted([
        ...((draftStructure[buildingName] ?? []).map((floor) => floor.trim())),
        ...locates
          .filter((item) => item.building_name === buildingName)
          .map((item) => item.floor),
      ]);

      knownFloors.forEach((floorName) => {
        grouped[buildingName][floorName] = locates.filter(
          (item) => item.building_name === buildingName && item.floor === floorName
        );
      });
    });

    return grouped;
  }, [buildingOptions, draftStructure, locates]);

  useEffect(() => {
    const loadAssignedPlaces = async () => {
      try {
        setLoading(true);
        const placeResponse = await axios.get<Place[]>("http://localhost:8080/places");
        const filtered = placeResponse.data.filter(
          (place) => (place.manager_id ?? "") === currentUser.user_id
        );
        setAssignedPlaces(filtered);
      } catch (error) {
        console.error("Failed to fetch assigned places", error);
      } finally {
        setLoading(false);
      }
    };

    loadAssignedPlaces();
  }, [currentUser.user_id]);

  useEffect(() => {
    const loadLocates = async () => {
      if (!decodedPlaceId) {
        setLocates([]);
        return;
      }

      try {
        const locateResponse = await axios.get<LocateItem[]>("http://localhost:8080/locates");
        setLocates(locateResponse.data.filter((item) => item.place_id === decodedPlaceId));
      } catch (error) {
        console.error("Failed to fetch locates", error);
      }
    };

    loadLocates();
  }, [decodedPlaceId]);

  useEffect(() => {
    if (!decodedPlaceId) {
      setDraftStructure({});
      return;
    }

    const raw = localStorage.getItem(getDraftKey(decodedPlaceId));

    if (!raw) {
      setDraftStructure({});
      return;
    }

    try {
      const parsed = JSON.parse(raw) as DraftStructure;
      setDraftStructure(parsed);
    } catch (error) {
      console.error("Failed to parse draft structure", error);
      setDraftStructure({});
    }
  }, [decodedPlaceId]);

  const persistDraft = (value: DraftStructure) => {
    setDraftStructure(value);

    if (!decodedPlaceId) {
      return;
    }

    localStorage.setItem(getDraftKey(decodedPlaceId), JSON.stringify(value));
  };

  const handleAddBuilding = () => {
    const buildingName = newBuilding.trim();

    if (!buildingName) {
      return;
    }

    if (draftStructure[buildingName]) {
      setNewBuilding("");
      return;
    }

    persistDraft({
      ...draftStructure,
      [buildingName]: [],
    });

    setNewBuilding("");
    if (!buildingForFloor) {
      setBuildingForFloor(buildingName);
    }
    if (!buildingForRoom) {
      setBuildingForRoom(buildingName);
    }
  };

  const handleAddFloor = () => {
    const buildingName = buildingForFloor.trim();
    const floorName = newFloor.trim();

    if (!buildingName || !floorName) {
      return;
    }

    const currentFloors = draftStructure[buildingName] ?? [];
    const nextFloors = getUniqueSorted([...currentFloors, floorName]);

    persistDraft({
      ...draftStructure,
      [buildingName]: nextFloors,
    });

    setNewFloor("");
    setBuildingForRoom(buildingName);
    if (!floorForRoom) {
      setFloorForRoom(floorName);
    }
  };

  const handleCreateRoom = async () => {
    const buildingName = buildingForRoom.trim();
    const floorName = floorForRoom.trim();
    const roomName = newRoom.trim();

    if (!selectedPlace || !buildingName || !floorName || !roomName) {
      return;
    }

    try {
      const payload = {
        locate_id: `LOC_${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
        place_id: selectedPlace.place_id,
        building_name: buildingName,
        floor: floorName,
        room: roomName,
      };

      const response = await axios.post<LocateItem>("http://localhost:8080/locates", payload);
      setLocates((prev) => [...prev, response.data]);
      setNewRoom("");
    } catch (error) {
      console.error("Failed to create room", error);
      alert("ไม่สามารถสร้างห้องได้");
    }
  };

  const handleDeleteRoom = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/locates/${id}`);
      setLocates((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete room", error);
      alert("ไม่สามารถลบห้องได้");
    }
  };

  if (loading) {
    return <div className="p-8 text-white">กำลังโหลดหน้า admin...</div>;
  }

  if (!decodedPlaceId || !selectedPlace) {
    return (
      <div className="p-8">
        <div className="max-w-3xl rounded-3xl border border-amber-300 bg-amber-50 p-6 text-amber-900">
          <h1 className="text-2xl font-bold">ยังไม่ได้เลือกสถานที่ หรือไม่มีสิทธิ์เข้าถึง</h1>
          <p className="mt-2 text-sm">กรุณาเลือกสถานที่จาก SideBar เฉพาะรายการที่ manager มอบหมายให้</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top,_#e0f2fe,_#f8fafc_28%,_#e2e8f0_100%)] px-8 py-8">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-lg shadow-slate-300/40">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Admin Place Workspace</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">{selectedPlace.name}</h1>
          <p className="mt-2 text-sm text-slate-600">{selectedPlace.place_id} • {selectedPlace.address}</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
            <h2 className="text-lg font-bold text-slate-900">1) สร้างชื่อตึก</h2>
            <p className="mt-1 text-xs text-slate-500">เพิ่มหมวดหมู่หลักของอาคารในสถานที่นี้</p>
            <input
              type="text"
              value={newBuilding}
              onChange={(event) => setNewBuilding(event.target.value)}
              placeholder="เช่น อาคาร A"
              className="mt-4 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-cyan-500"
            />
            <button
              type="button"
              onClick={handleAddBuilding}
              className="mt-3 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              เพิ่มตึก
            </button>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
            <h2 className="text-lg font-bold text-slate-900">2) สร้างชั้น</h2>
            <p className="mt-1 text-xs text-slate-500">เลือกตึกที่ต้องการก่อนเพิ่มชั้น</p>
            <select
              value={buildingForFloor}
              onChange={(event) => setBuildingForFloor(event.target.value)}
              className="mt-4 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-cyan-500"
            >
              <option value="">เลือกตึก</option>
              {buildingOptions.map((building) => (
                <option key={building} value={building}>
                  {building}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newFloor}
              onChange={(event) => setNewFloor(event.target.value)}
              placeholder="เช่น ชั้น 2"
              className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-cyan-500"
            />
            <button
              type="button"
              onClick={handleAddFloor}
              className="mt-3 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              เพิ่มชั้น
            </button>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
            <h2 className="text-lg font-bold text-slate-900">3) สร้างห้อง</h2>
            <p className="mt-1 text-xs text-slate-500">เลือกตึกและชั้นก่อนเพิ่มห้อง</p>
            <select
              value={buildingForRoom}
              onChange={(event) => {
                setBuildingForRoom(event.target.value);
                setFloorForRoom("");
              }}
              className="mt-4 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-cyan-500"
            >
              <option value="">เลือกตึก</option>
              {buildingOptions.map((building) => (
                <option key={building} value={building}>
                  {building}
                </option>
              ))}
            </select>
            <select
              value={floorForRoom}
              onChange={(event) => setFloorForRoom(event.target.value)}
              className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-cyan-500"
            >
              <option value="">เลือกชั้น</option>
              {floorOptionsForRoom.map((floorName) => (
                <option key={floorName} value={floorName}>
                  {floorName}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newRoom}
              onChange={(event) => setNewRoom(event.target.value)}
              placeholder="เช่น ห้องน้ำหญิง 204"
              className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-cyan-500"
            />
            <button
              type="button"
              onClick={handleCreateRoom}
              className="mt-3 w-full rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700"
            >
              เพิ่มห้อง
            </button>
          </article>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-300/40">
          <h2 className="text-2xl font-bold text-slate-900">โครงสร้างสถานที่</h2>
          <p className="mt-1 text-sm text-slate-500">ตึก {">"} ชั้น {">"} ห้อง สำหรับสถานที่นี้</p>

          <div className="mt-6 space-y-5">
            {Object.keys(groupedData).length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
                ยังไม่มีข้อมูลตึก/ชั้น/ห้องในสถานที่นี้
              </div>
            )}

            {Object.entries(groupedData).map(([buildingName, floors]) => (
              <article key={buildingName} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-bold text-slate-900">{buildingName}</h3>

                <div className="mt-4 space-y-4">
                  {Object.keys(floors).length === 0 && (
                    <p className="text-sm text-slate-500">ยังไม่มีชั้น</p>
                  )}

                  {Object.entries(floors).map(([floorName, rooms]) => (
                    <div key={`${buildingName}-${floorName}`} className="rounded-xl border border-slate-200 bg-white p-4">
                      <p className="text-sm font-semibold text-slate-800">{floorName}</p>

                      {rooms.length === 0 ? (
                        <p className="mt-2 text-xs text-slate-500">ยังไม่มีห้องในชั้นนี้</p>
                      ) : (
                        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                          {rooms.map((room) => (
                            <div key={room.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm">
                              <span>{room.room}</span>
                              <button
                                type="button"
                                onClick={() => handleDeleteRoom(room.id)}
                                className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-600 hover:bg-rose-200"
                              >
                                ลบ
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPlaceWorkspace;
