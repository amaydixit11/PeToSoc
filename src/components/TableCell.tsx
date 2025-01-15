import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Book, 
  Globe, 
  Slack,
  Twitter, 
  Mail,
  Youtube,
  ExternalLink
} from "lucide-react";
import { Block, Society, Social } from "@/types/societies";

const SOCIAL_ICON_MAP: Record<Social, { title: string; icon: React.ComponentType }> = {
  fb: { title: "Facebook", icon: Facebook },
  insta: { title: "Instagram", icon: Instagram },
  linkedin: { title: "LinkedIn", icon: Linkedin },
  metawiki: { title: "MetaWiki", icon: Book },
  website: { title: "Website", icon: Globe },
  slack: { title: "Slack", icon: Slack },
  twitter: { title: "Twitter", icon: Twitter },
  email: { title: "Email", icon: Mail },
  youtube: { title: "YouTube", icon: Youtube },
};  

const BLOCK_COLORS = {
  // Technical (like Alkali Metals) - Red/Pink theme
  T: {
    bg: "bg-rose-500",
    hover: "hover:bg-rose-600",
    light: "bg-rose-200",
  },
  // Organizational (like Alkaline Earth Metals) - Orange/Yellow theme
  O: {
    bg: "bg-amber-500",
    hover: "hover:bg-amber-600",
    light: "bg-amber-200",
  },
  // Technical-Organizational (like Transition Metals) - Yellow theme
  TO: {
    bg: "bg-yellow-500",
    hover: "hover:bg-yellow-600",
    light: "bg-yellow-200",
  },
  // Creative (like Post-Transition Metals) - Blue-Green theme
  C: {
    bg: "bg-cyan-500",
    hover: "hover:bg-cyan-600",
    light: "bg-cyan-200",
  },
  // Creative-Cultural (like Metalloids) - Green theme
  CC: {
    bg: "bg-emerald-500",
    hover: "hover:bg-emerald-600",
    light: "bg-emerald-200",
  },
  // Welfare (like Lanthanides/Actinides) - Purple theme
  W: {
    bg: "bg-purple-500",
    hover: "hover:bg-purple-600",
    light: "bg-purple-200",
  },
  // Uncategorized (like Noble Gases) - Blue theme
  M: {
    bg: "bg-blue-500",
    hover: "hover:bg-blue-600",
    light: "bg-blue-200",
  },
  S: {
    bg: "bg-blue-500",
    hover: "hover:bg-blue-600",
    light: "bg-blue-200",
  },
};

interface BlockColorProps {
  block: Block;
  className?: string;
  isLight?: boolean;
  hover?: boolean;
}

export function BlockColor({ block, className, isLight = false, hover = false }: BlockColorProps) {
  const blockColor = BLOCK_COLORS[block];
  return cn(
    isLight ? blockColor.light : blockColor.bg,
    hover && blockColor.hover,
    className
  );
}
export type TableCellProps =
  | { type: "society"; society: Society; index: number; invisible?: boolean }
  | { type: "undiscovered"; index: number; block: Block; invisible?: boolean }
  | { type: "empty"; invisible?: boolean }
  | { type: "inner-transition"; invisible?: boolean }
  | { type: "the-unknown-soc"; invisible?: boolean };


function getIUPACName(index: number) {
  const ROOTS = ["nil", "un", "bi", "tri", "quad", "pent", "hex", "sept", "oct", "en"];
  const digits = index.toString().split("").map(Number);

  const symbol = digits
    .map(d => ROOTS[d][0])
    .join("")
    .replace(/^(.)/, c => c.toUpperCase());

  const name = digits
    .map(d => ROOTS[d])
    .join("")
    .replace(/^(.)/, c => c.toUpperCase())
    .replace(/nnn/g, "nn")
    .replace(/ii/g, "i") + "ium";

  return { name, symbol };
}

function SocietyDetails({ description, links, elementProps }: { 
  name: string; 
  description: string; 
  links: Array<{ title: string; url: string; Icon: React.ComponentType }>; 
  elementProps: TableCellProps;
}) {
  return (
    <div className="space-y-6 p-2">
      <div className="flex justify-center">
        <Element {...elementProps} />
      </div>
      
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {links.map(({ title, url}) => (
          <Button
            key={url}
            variant="outline"
            asChild
            className="w-full transition-colors hover:bg-gray-50"
          >
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-2"
            >
              {/* <Icon className="w-4 h-4" /> */}
              <span className="text-sm">{title}</span>
              <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}


function Element(props: TableCellProps) {
  const baseClasses = "relative p-3 w-24 h-24 transition-all duration-200";

  if (props.type === "society") {
    return (
      <div 
        className={cn(
          baseClasses,
          BlockColor({ 
            block: props.society.block, 
            hover: true 
          }),
          "hover:z-10 hover:shadow-lg", // Added z-10 instead of scale for better periodic table feel
          "text-white border-[0.5px] border-gray-700/20" // Added subtle border
        )}
      >
        <div className="flex justify-between items-start text-xs">
          <span className="font-mono">{props.index}</span>
          <span>{props.society.year}</span>
        </div>
        
        <div className="flex flex-col items-center justify-center h-full -mt-4">
          <span className="text-xl font-bold tracking-wide">{props.society.symbol}</span>
          <span className="text-xs mt-1 opacity-90">{props.society.size}</span>
        </div>
        
        {props.society.tsg_recognized && (
          <span className="absolute bottom-1 right-1 text-xs">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-white/20">
              CoSA
            </span>
          </span>
        )}
      </div>
    );
  }

  if (props.type === "undiscovered") {
    const { symbol } = getIUPACName(props.index);
    return (
      <div 
        className={cn(
          baseClasses,
          BlockColor({ 
            block: props.block, 
            isLight: true,
            hover: true 
          }),
          "hover:z-10 hover:shadow-lg",
          "cursor-pointer border-[0.5px] border-gray-700/20"
        )}
      >
        <div className="flex justify-between items-start text-xs text-gray-600">
          <span className="font-mono">{props.index}</span>
          <span>?</span>
        </div>
        
        <div className="flex flex-col items-center justify-center h-full -mt-4">
          <span className="text-xl font-bold tracking-wide text-gray-700">{symbol}</span>
          <span className="text-xs mt-1 text-gray-500">Undiscovered</span>
        </div>
      </div>
    );
  }

  if (props.type === "empty") {
    return <div className={cn(baseClasses, "border-0")} />;
  }

  if (props.type === "inner-transition") {
    return (
      <div className={cn(baseClasses, "flex items-center justify-center border-[0.5px] border-gray-300")}>
        <span className="text-xl text-gray-400">↓</span>
      </div>
    );
  }

  if (props.type === "the-unknown-soc") {
    return (
      <div className={cn(
        baseClasses,
        "bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300",
        "hover:z-10 hover:shadow-lg",
        "cursor-pointer border-[0.5px] border-gray-700/20"
      )}>
        <div className="flex justify-between items-start text-xs text-gray-500">
          <span>?</span>
          <span>?</span>
        </div>
        
        <div className="flex flex-col items-center justify-center h-full -mt-4">
          <span className="text-xl font-bold tracking-wide text-gray-700">Us</span>
          <span className="text-xs mt-1 text-gray-500">Unknown</span>
        </div>
      </div>
    );
  }

  return null;
}

export function TableCell(props: TableCellProps) {
  if (props.invisible) {
    return null;
  }

  if (props.type === "empty" || props.type === "inner-transition") {
    return <Element {...props} />;
  }

  const getModalContent = () => {
    if (props.type === "society") {
      const links = Object.entries(props.society.links).map(([social, url]) => {
        const { title, icon: Icon } = SOCIAL_ICON_MAP[social as Social];
        return { title, url: url as string, Icon };
      });

      return (
        <SocietyDetails
          name={props.society.name}
          description={props.society.description}
          links={links}
          elementProps={props}
        />
      );
    }

    if (props.type === "the-unknown-soc") {
      return (
        <SocietyDetails
          name="The Unknown Society"
          description="Incompleteness creates room for innovation. If your society is not listed here, let us know via the Slack link below."
          links={[{ 
            title: "Join Slack", 
            url: "https://slack.metakgp.org", 
            Icon: Slack 
          }]}
          elementProps={props}
        />
      );
    }

    const { name } = getIUPACName(props.index);
    return (
      <SocietyDetails
        name={`${name} (Undiscovered)`}
        description="This society has not been discovered yet. If you know any society that fits this category, let us know at the Slack link below."
        links={[{ 
          title: "Join Slack", 
          url: "https://slack.metakgp.org", 
          Icon: Slack 
        }]}
        elementProps={props}
      />
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <Element {...props} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">
            {props.type === "society" 
              ? props.society.name 
              : props.type === "the-unknown-soc"
              ? "The Unknown Society"
              : `${getIUPACName(props.index).name} (Undiscovered)`}
          </DialogTitle>
        </DialogHeader>
        {getModalContent()}
      </DialogContent>
    </Dialog>
  );
}