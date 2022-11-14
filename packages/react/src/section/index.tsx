import { ItemType, ResizerItemConfig } from '@column-resizer/core';
import * as React from 'react';

import { useForwardedRef, useColumnResizer, useColumnResizerEvent } from '../hooks';
import { RefObject } from 'react';

export type SectionProps = React.HTMLAttributes<HTMLDivElement> &
  ResizerItemConfig & {
    innerRef?: RefObject<HTMLDivElement>;
    onSizeChanged?: (currentSize: number) => void;
  };

export function Section({
  defaultSize,
  size,
  disableResponsive,
  minSize,
  maxSize,
  innerRef,
  onSizeChanged,
  ...props
}: SectionProps) {
  const ref = useForwardedRef<HTMLDivElement | null>(null, innerRef);
  const columnResizer = useColumnResizer();

  useColumnResizerEvent(ref, 'section:size-change', (e) => onSizeChanged?.(e.detail.size));

  return (
    <div
      ref={ref}
      data-item-type={ItemType.SECTION}
      data-item-config={JSON.stringify({ defaultSize, size, disableResponsive, minSize, maxSize })}
      {...props}
      style={{
        overflow: 'hidden',
        [columnResizer.config.vertical ? 'maxHeight' : 'maxWidth']: maxSize,
        [columnResizer.config.vertical ? 'minHeight' : 'minWidth']: minSize,
        ...props.style,
      }}
    />
  );
}
