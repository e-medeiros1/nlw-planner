import { Link2, Tag, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { FormEvent, useState } from "react";
import { Button } from "../components/button";

interface ImportantLinksModalProps {
  changeImportantLinkModal: () => void;
}

export function ImportantLinksModal({
  changeImportantLinkModal,
}: ImportantLinksModalProps) {
  const [linkTitle, setLinkTitle] = useState("");
  const [urlName, setUrlName] = useState("");
  const { tripId } = useParams();
  const navigate = useNavigate();

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await api.post(`/trips/${tripId}/links`, {
        linkTitle,
        links: urlName,
      });

      changeImportantLinkModal();
      navigate(0);
    } catch (error) {
      return;
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>
            <button onClick={changeImportantLinkModal}>
              <X className="h-5 w-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links adicionados.
          </p>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form onSubmit={createLink} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              name="title"
              placeholder="Título do link"
              className="bg-transparent placeholder-zinc-400 outline-none flex-1"
              value={linkTitle}
              onChange={(e) => setLinkTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Link2 className="text-zinc-400 size-5" />
              <input
                name="url"
                placeholder="URL"
                className="bg-transparent placeholder-zinc-400 outline-none flex-1"
                value={urlName}
                onChange={(e) => setUrlName(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="full">
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  );
}
