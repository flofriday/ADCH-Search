import { Button } from "./ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

interface props {
    current: number,
    available: number[],
    onChange: (value: number) => void,
}

export function NumberSelector({ current, available, onChange }: props) {

    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    {current}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {available.map((choice) => (
                                <CommandItem
                                    key={choice}
                                    value={choice.toString()}
                                    onSelect={() => {
                                        setOpen(false)
                                        onChange(choice)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            current === choice ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {choice}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}