"use client";

import { Button } from "@/components/ui/button";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import type { PaginationMeta } from "@/lib/types/gallery";

interface PaginationProps {
  pagination: PaginationMeta;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  showInfo?: boolean;
  itemName?: string; // e.g., "images", "testimonies", "items"
}

export function Pagination({
  pagination,
  currentPage,
  onPageChange,
  className = "",
  showInfo = true,
  itemName = "items",
}: PaginationProps) {
  // Don't render if only one page
  if (pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className={className}>
      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!pagination.hasPreviousPage}
          className="gap-2"
        >
          <CaretLeftIcon weight="bold" />
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
            .filter((page) => {
              // Show first page, last page, current page, and pages around current
              return (
                page === 1 ||
                page === pagination.totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              );
            })
            .map((page, index, array) => {
              // Add ellipsis when there's a gap
              const showEllipsisBefore =
                index > 0 && page - array[index - 1] > 1;

              return (
                <div key={page} className="flex items-center gap-1">
                  {showEllipsisBefore && (
                    <span className="px-2 text-muted-foreground">...</span>
                  )}
                  <Button
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(page)}
                    className="min-w-10"
                  >
                    {page}
                  </Button>
                </div>
              );
            })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!pagination.hasNextPage}
          className="gap-2"
        >
          Next
          <CaretRightIcon weight="bold" />
        </Button>
      </div>

      {/* Pagination Info */}
      {showInfo && (
        <div className="text-center text-sm text-muted-foreground mt-6">
          Showing {pagination.itemsPerPage * (currentPage - 1) + 1}-
          {Math.min(
            pagination.itemsPerPage * currentPage,
            pagination.totalItems
          )}{" "}
          of {pagination.totalItems} {itemName}
          {pagination.totalPages > 1 && (
            <>
              {" "}
              • Page {currentPage} of {pagination.totalPages}
            </>
          )}
        </div>
      )}
    </div>
  );
}
