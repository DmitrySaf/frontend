"use client";

import type { MonthPoint } from "@/entities/subscription";
import { formatRub } from "@/entities/subscription";
import { cn } from "@/shared/utils";
import { useState } from "react";

/** Тултип-плашка по DS (тёмная, 12.5px) над отмеченной точкой/баром */
function ChartTooltip({ label, value }: { label: string; value: string }) {
  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-10 pointer-events-none whitespace-nowrap rounded-xl bg-black px-3 py-1.5 text-[12.5px] font-medium text-white shadow-lg">
      <span className="text-white/70">{label} · </span>
      {value}
    </div>
  );
}

/**
 * Доход по месяцам: один ряд — без легенды; текущий месяц выделен primary,
 * остальные — нейтральные; ховер-тултип на каждом баре
 */
export function RevenueBarChart({ data }: { data: MonthPoint[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...data.map((point) => point.value), 1);

  return (
    <div>
      <div className="flex items-end gap-2 h-[150px]">
        {data.map((point, index) => {
          const isCurrent = index === data.length - 1;
          const heightPercent = (point.value / max) * 100;
          return (
            <div
              key={index}
              className="relative flex-1 h-full flex items-end cursor-default"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={cn(
                  "relative w-full rounded-t-[4px] transition-colors",
                  isCurrent
                    ? "bg-primary-600"
                    : hovered === index
                      ? "bg-gray-300"
                      : "bg-gray-100 border border-gray-200 border-b-0"
                )}
                style={{ height: `${Math.max(heightPercent, 2)}%` }}
              >
                {hovered === index && (
                  <ChartTooltip label={point.label} value={formatRub(point.value)} />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-1.5 flex gap-2">
        {data.map((point, index) => (
          <span key={index} className="flex-1 text-center text-[10px] text-gray-500">
            {point.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Рост участников: одна линия 2px, ховер-точки ≥8px с тултипом
 */
export function MembersLineChart({ data }: { data: MonthPoint[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...data.map((point) => point.value), 1);

  const W = 100;
  const H = 100;
  const points = data.map((point, index) => ({
    x: data.length > 1 ? (index / (data.length - 1)) * W : W / 2,
    y: H - (point.value / max) * (H - 8) - 2,
  }));
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="relative h-[150px]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
      >
        <polyline
          points={polyline}
          fill="none"
          stroke="var(--color-primary-600)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      {/* Ховер-зоны и точки — HTML-слой, чтобы точки не искажались */}
      <div className="absolute inset-0 flex">
        {data.map((point, index) => (
          <div
            key={index}
            className="relative flex-1"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === index && (
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: `${points[index].y}%` }}
              >
                <div className="relative -translate-y-1/2">
                  <div className="size-2.5 rounded-full bg-primary-600 ring-2 ring-white" />
                  <ChartTooltip
                    label={point.label}
                    value={`${point.value.toLocaleString("ru-RU")} участников`}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
