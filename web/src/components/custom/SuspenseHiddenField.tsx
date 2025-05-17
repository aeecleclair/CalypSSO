"use client";

import { HiddenField, HiddenFieldProps } from "./HiddenField";
import { SuspenseEmbed } from "./SuspenseEmbed";

export const SuspenseHiddenField = ({
  form,
  queryParam,
  name,
  optional = false,
}: HiddenFieldProps) => {
  return (
    <SuspenseEmbed>
      <HiddenField
        form={form}
        name={name}
        queryParam={queryParam}
        optional={optional}
      />
    </SuspenseEmbed>
  );
};
