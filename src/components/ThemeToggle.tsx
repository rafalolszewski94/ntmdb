"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/components/ui/select";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Select value={theme} onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}>
      <SelectTrigger
        className={'min-w-auto'}
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4 block transition-all dark:hidden" />
        <Moon className="h-4 w-4 hidden transition-all dark:block" />
        <span className="sr-only">Toggle theme</span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          className="flex items-center gap-2"
          value={'light'}
        >
          <div className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          <span>Light</span>
          </div>
        </SelectItem>
        <SelectItem
          value={'dark'}
          className="flex items-center gap-2"
        >
<div className="flex items-center gap-2">
<Moon className="h-4 w-4" />
<span>Dark</span>
</div>
        </SelectItem>
        <SelectItem
          value={'system'}
          className="flex items-center gap-2"
        >
    <div className="flex items-center gap-2">
<Monitor className="h-4 w-4" />
<span>System</span>
</div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ThemeToggle;