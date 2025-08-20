// components/DealsKanban.jsx
import React, { use, useEffect, useMemo, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";

import useDealsService from "../../services/useDealsService";
import { setDealsColumns } from "../../store/dealsSlice";

export default function DealsKanban() {
  const { stages, columns, isLoading } = useSelector((state) => state.deals);
  const dispatch = useDispatch();
  const { fetchBoard, updateStage } = useDealsService();

  useEffect(() => {
    fetchBoard();
  }, []);

  const columnTotals = useMemo(() => {
    const totals = {};
    stages.forEach((s) => {
      const list = columns[s] || [];
      totals[s] = list.reduce(
        (sum, d) => sum + (d.finalValue ?? d.expectedValue ?? 0),
        0
      );
    });
    return totals;
  }, [stages, columns]);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // optimistic update
    const prev = JSON.parse(JSON.stringify(columns));
    const sourceCol = Array.from(columns[source.droppableId] || []);
    const destCol = Array.from(columns[destination.droppableId] || []);

    const [moved] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, moved);

    const nextColumns = {
      ...columns,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    };
    dispatch(setDealsColumns(nextColumns));
    try {
      await updateStage(draggableId, destination.droppableId);
    } catch (error) {
      console.error("Failed to update stage:", error);
      dispatch(setDealsColumns(prev)); // revert on error
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">Loading deals pipeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen w-full border-inherit ">
      <div className="rounded-lg border  p-6 mb-6 border-inherit">
        <div className="flex items-center gap-3">
          <div className="w-full text-start">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Deals Pipeline
            </h1>
            <p className="text-gray-600">
              Manage and track your sales opportunities
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 pb-10 border-inherit">
        <DragDropContext onDragEnd={onDragEnd}>
          {stages.map((stageKey) => {
            const items = columns[stageKey] || [];
            const title = stageKey
              .replaceAll("_", " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());

            return (
              <Droppable droppableId={stageKey} key={stageKey}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-white rounded-lg border-2 border-dashed border-inherit p-4 min-w-[265px] max-w-[280px] min-h-[500px] shadow-sm transition-all duration-200 ${
                      snapshot.isDraggingOver
                        ? "bg-blue-50 border-blue-300 shadow-md"
                        : "hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                          {title}
                        </h2>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                          {items.length}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                      <div className="text-xs text-green-700 font-medium mb-1">
                        Total Value
                      </div>
                      <div className="text-lg font-bold text-green-800">
                        ₹{(columnTotals[stageKey] || 0).toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div className="space-y-3 text-start">
                      {items.map((deal, index) => (
                        <Draggable
                          key={deal.id}
                          draggableId={deal.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white rounded-lg p-4 border border-gray-200 transition-all duration-200 cursor-grab active:cursor-grabbing ${
                                snapshot.isDragging
                                  ? "shadow-lg scale-105 rotate-2 border-blue-300"
                                  : "hover:shadow-md hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <h3 className="font-medium text-gray-900 text-sm leading-tight flex-1 mr-2">
                                  {deal.title}
                                </h3>
                                <div className="flex-shrink-0">
                                  <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 8h16M4 16h16"
                                    />
                                  </svg>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1">
                                  <svg
                                    className="w-4 h-4 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                    />
                                  </svg>
                                  <span className="text-sm font-semibold text-green-700">
                                    ₹
                                    {(
                                      deal.finalValue ??
                                      deal.expectedValue ??
                                      0
                                    ).toLocaleString("en-IN")}
                                  </span>
                                </div>
                              </div>

                              {deal.assignedTo?.name && (
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                                      {deal.assignedTo.name
                                        .charAt(0)
                                        .toUpperCase()}
                                    </div>
                                    <span className="text-xs text-gray-600 font-medium">
                                      {deal.assignedTo.name}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}
