import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/button";
import { Activities } from "./activities";
import { CreateActivityModal } from "./create-activity-modal";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Guests } from "./guests";
import { ImportantLink } from "./important-links";
import { ImportantLinksModal } from "./important-links-modal";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);
  const [isImportantLinkModalOpen, setIsImportantLinkModalOpen] =
    useState(false);

  function changeCreateActivityModal() {
    setIsCreateActivityModalOpen(!isCreateActivityModalOpen);
    console.log(isCreateActivityModalOpen);
  }
  function changeImportantLinkModal() {
    setIsImportantLinkModalOpen(!isImportantLinkModalOpen);
    console.log(isImportantLinkModalOpen);
  }
  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <Button
              onClick={changeCreateActivityModal}
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
            >
              <Plus className="size-5" />
              Cadastrar atividade
            </Button>
          </div>

          <Activities />
        </div>
        <div className="w-80 space-y-6">
          <ImportantLink changeImportantLinkModal={changeImportantLinkModal} />

          <Guests />
        </div>
      </main>

      {isImportantLinkModalOpen && (
        <ImportantLinksModal
          changeImportantLinkModal={changeImportantLinkModal}
        />
      )}

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          changeCreateActivityModal={changeCreateActivityModal}
        />
      )}
    </div>
  );
}
