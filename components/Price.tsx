"use client";

import * as React from "react";
import { formatPrice } from "@/lib/utils";

type PriceProps = {
  value: number;
  className?: string;
};

export const Price = ({ value, className }: PriceProps) => {
  return (
    <span className={className} aria-label={`السعر ${formatPrice(value)}`}>
      {formatPrice(value)}
    </span>
  );
};
