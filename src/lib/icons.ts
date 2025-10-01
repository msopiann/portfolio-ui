import * as Icons from "@icons-pack/react-simple-icons";

export function getIcon(
  name: keyof typeof Icons,
): React.ComponentType<{ size?: number; color?: string }> {
  return Icons[name] as unknown as React.ComponentType<{
    size?: number;
    color?: string;
  }>;
}
