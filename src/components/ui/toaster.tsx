
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} {...props} className={variant === "destructive" ? "border-red-600 bg-red-100 text-red-900" : ""}>
            <div className="grid gap-1">
              {title && <ToastTitle className={variant === "destructive" ? "text-red-900 font-semibold" : ""}>{title}</ToastTitle>}
              {description && (
                <ToastDescription className={variant === "destructive" ? "text-red-800" : ""}>
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
