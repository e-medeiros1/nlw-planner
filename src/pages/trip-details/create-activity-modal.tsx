import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../components/button";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface CreateActivityModalProps {
  changeCreateActivityModal: () => void;
}

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export function CreateActivityModal({
  changeCreateActivityModal,
}: CreateActivityModalProps) {
  const [activityTitle, setActivityTitle] = useState("");
  const [occursAt, setOccursAt] = useState("");
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [trip, setTrip] = useState<Trip | undefined>();

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const occursAt = data.get("occurs_at")?.toString();
    const tripStartsDate = trip?.starts_at;
    const tripEndsDate = trip?.ends_at;

    try {
      await api.post(`/trips/${tripId}/activities`, {
        title,
        occurs_at: occursAt,
      });

      setErrorMessage(null);
      changeCreateActivityModal();
      navigate(0);
    } catch (error) {
      if (occursAt! < tripStartsDate! || occursAt! > tripEndsDate!) {
       
         console.log(
          "The date of the activity are inferior to the trip date."
        );
        setErrorMessage('Activity date cannot be before the trip start date.');
        return;

      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button onClick={changeCreateActivityModal}>
              <X className="h-5 w-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              name="title"
              placeholder="Qual a atividade?"
              className="bg-transparent placeholder-zinc-400 outline-none flex-1"
              value={activityTitle}
              onChange={(e) => setActivityTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Calendar className="text-zinc-400 size-5" />
              <input
                type="datetime-local"
                name="occurs_at"
                placeholder="17/08/2023 08:00"
                className="bg-transparent placeholder-zinc-400 outline-none flex-1"
                value={occursAt}
                onChange={(e) => setOccursAt(e.target.value)}
              />
            </div>
          </div>

          <Button variant="primary" size="full">
            Salvar atividade
          </Button>
          {errorMessage && <p className="text-red-500 flex justify-center">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
