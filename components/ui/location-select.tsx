"use client";

import { Label, ListBox, Select, type Key } from "@heroui/react";

interface LocationSelectProps {
  label: string;
  name: string;
  placeholder: string;
  items: string[];
  value: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
}

export function LocationSelect({
  label,
  name,
  placeholder,
  items,
  value,
  onChange,
  isDisabled = false,
}: LocationSelectProps) {
  return (
    <Select
      name={name}
      placeholder={placeholder}
      isRequired
      isDisabled={isDisabled}
      value={value || null}
      onChange={(key: Key | null) => onChange(key ? String(key) : "")}
      className="w-full"
    >
      <Label>{label}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {items.map((item) => (
            <ListBox.Item key={item} id={item} textValue={item}>
              {item}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}