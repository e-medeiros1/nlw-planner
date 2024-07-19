import { Link2, Plus } from "lucide-react";
import { Button } from "../components/button";

interface ImportantLinksModalProps {
  changeImportantLinkModal: () => void;
}

// interface Links {
//   links: {
//     id: string;
//     title: string;
//     url: string;
//   }[];
// }

export function ImportantLink({
  changeImportantLinkModal,
}: ImportantLinksModalProps) {
  // const { tripId } = useParams();
  // const [links, setLinks] = useState<Links[]>([]);

  // useEffect(() => {
  //   api
  //     .get(`/trips/${tripId}/links`)
  //     .then((response) => setLinks(response.data.links));
  // }, [tripId]);

  return (
    <div className="space-y-8">
      <div className="w-80 space-y-6">
        <div className="space-y-6">
          <h2 className="font-semibold text-xl">Links importantes</h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  Reserva Airbnb
                </span>
                <a
                  href="#"
                  className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                >
                  https://www.airbnb.com.br/rooms/126
                </a>
              </div>
              <Link2 className="text-zinc-400 size-5 sh" />
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  Reserva AirBnB
                </span>
                <a
                  href="#"
                  className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                >
                  https://www.airbnb.com.br/rooms/126
                </a>
              </div>
              <Link2 className="text-zinc-400 size-5 sh" />
            </div>
          </div>

          <Button
            variant="secondary"
            onClick={changeImportantLinkModal}
            className="rounded-lg px-5 py-2 font-medium flex items-center gap-2 justify-center bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
          >
            <Plus className="size-5" />
            Cadastrar novo link
          </Button>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        {/* <div className="m-full h-px bg-zinc-800"></div> */}
      </div>
    </div>
  );
}
