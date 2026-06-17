import { useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from './ui/collapsible'

function Footer() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <footer className="w-full pt-2 pb-4 mt-auto bg-background text-center text-xs text-muted-foreground border-t border-border">
            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="max-w-xl mx-auto px-4"
            >
                <p className="flex items-center justify-center gap-1 select-none">
                    <CollapsibleTrigger className="underline hover:text-foreground transition-colors cursor-pointer font-medium focus:outline-none ml-1">
                        Legal Info
                    </CollapsibleTrigger>
                </p>

                <CollapsibleContent className="mt-4 space-y-4 text-left p-4 rounded-md border border-border bg-muted/50 text-muted-foreground text-xs leading-relaxed animate-in fade-in-0 duration-200">
                    <div>
                        <h4 className="font-semibold text-foreground mb-1">
                            Legal Notice
                        </h4>
                        <p>Fabian Eilts</p>
                        <p>
                            Contact:{' '}
                            <span className="underline">
                                fabianeilts@protonmail.com
                            </span>
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-1">
                            Privacy & Hosting
                        </h4>
                        <p>
                            This website is hosted by{' '}
                            <strong>Vercel.com</strong>. Due to technical
                            necessity, Vercel automatically processes and stores
                            server log files (such as your IP address, browser
                            type, and time of access) to deliver this page
                            securely. No personal tracking cookies or analytics
                            tools are used by this application.
                        </p>
                    </div>

                    <div className="pt-2 border-t border-border/60 text-[11px] text-muted-foreground/80">
                        <strong>TUTTO calculator</strong> is an independent,
                        non-commercial fan project and is not affiliated with,
                        endorsed, or sponsored by the game's creators. TUTTO is
                        a registered trademark of its respective owners.
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </footer>
    )
}

export default Footer
