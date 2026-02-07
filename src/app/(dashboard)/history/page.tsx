"use client";

import { ConversationFilters } from "@/components/history/conversation-filters";
import { ConversationList } from "@/components/history/conversation-list";
import { DeleteDialog } from "@/components/history/delete-dialog";
import { ExportDialog } from "@/components/history/export-dialog";
import { Pagination } from "@/components/history/pagination";
import { useConversations } from "@/hooks/use-conversations";
import { History } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HistoryPage() {
  // ============================================
  // ESTADO DE FILTROS
  // ============================================
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"recent" | "oldest" | "most_messages">(
    "recent"
  );
  const [model, setModel] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [page, setPage] = useState(1);

  // ============================================
  // DIALOGS
  // ============================================
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    id: string;
    title: string;
  }>({ isOpen: false, id: "", title: "" });

  const [exportDialog, setExportDialog] = useState<{
    isOpen: boolean;
    id: string;
    title: string;
  }>({ isOpen: false, id: "", title: "" });

  const [isDeleting, setIsDeleting] = useState(false);

  // ============================================
  // HOOK DE CONVERSACIONES
  // ============================================
  const {
    conversations,
    total,
    totalPages,
    isLoading,
    deleteConversation,
    renameConversation,
    archiveConversation,
    pinConversation,
  } = useConversations({
    search,
    model,
    sort,
    archived: showArchived,
    page,
    limit: 12,
  });

  // Reset page cuando cambian filtros
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSortChange = (value: "recent" | "oldest" | "most_messages") => {
    setSort(value);
    setPage(1);
  };

  const handleModelChange = (value: string) => {
    setModel(value);
    setPage(1);
  };

  const handleArchivedChange = (value: boolean) => {
    setShowArchived(value);
    setPage(1);
  };

  // ============================================
  // ACCIONES
  // ============================================

  const handleRename = async (id: string, title: string) => {
    await renameConversation(id, title);
  };

  const handleDeleteClick = (id: string) => {
    const conv = conversations.find((c) => c.id === id);
    setDeleteDialog({
      isOpen: true,
      id,
      title: conv?.title || "Sin título",
    });
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    await deleteConversation(deleteDialog.id);
    setIsDeleting(false);
    setDeleteDialog({ isOpen: false, id: "", title: "" });
  };

  const handleArchive = async (id: string) => {
    await archiveConversation(id);
  };

  const handlePin = async (id: string) => {
    await pinConversation(id);
  };

  const handleExport = (id: string) => {
    const conv = conversations.find((c) => c.id === id);
    setExportDialog({
      isOpen: true,
      id,
      title: conv?.title || "Sin título",
    });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-[#0a0a0a]">
            <History className="h-5 w-5 text-gray-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Historial</h1>
            <p className="text-xs text-gray-500">
              Todas tus conversaciones con Black AI
            </p>
          </div>
        </div>

        <Link
          href="/chat"
          className="rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-gray-200"
        >
          + Nuevo Chat
        </Link>
      </div>

      {/* Filtros */}
      <ConversationFilters
        search={search}
        onSearchChange={handleSearchChange}
        sort={sort}
        onSortChange={handleSortChange}
        model={model}
        onModelChange={handleModelChange}
        showArchived={showArchived}
        onArchivedChange={handleArchivedChange}
        totalResults={total}
      />

      {/* Lista */}
      <div className="mt-6">
        <ConversationList
          conversations={conversations}
          isLoading={isLoading}
          onRename={handleRename}
          onDelete={handleDeleteClick}
          onArchive={handleArchive}
          onPin={handlePin}
          onExport={handleExport}
        />
      </div>

      {/* Paginación */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* Dialogs */}
      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        title={deleteDialog.title}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ isOpen: false, id: "", title: "" })}
        isLoading={isDeleting}
      />

      <ExportDialog
        isOpen={exportDialog.isOpen}
        conversationId={exportDialog.id}
        conversationTitle={exportDialog.title}
        onClose={() => setExportDialog({ isOpen: false, id: "", title: "" })}
      />
    </div>
  );
}
