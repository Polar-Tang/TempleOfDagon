import { AlertCircle } from "lucide-react"
import ReactDOM from 'react-dom';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

type variant = "default" | "destructive"

type AlertProps = {
  title: string
  description: string
  variant: variant
}

export const AlertDestructive = ({title, description, variant}: AlertProps) => {
  return ReactDOM.createPortal(
    <Alert variant={variant}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>,
    document.body
  )
}
