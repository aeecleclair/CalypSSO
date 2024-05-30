"use client";

import { HiddenField, HiddenFieldProps } from "./HiddenField";
import { SuspenseEmbed } from "./SuspenseEmbed";

export const SuspenseHiddenField = ({
  form,
  queryParam,
  name,
}: HiddenFieldProps) => {
  return (
    <SuspenseEmbed>
      <HiddenField form={form} name={name} queryParam={queryParam} />
    </SuspenseEmbed>
  );
};
