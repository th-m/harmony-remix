import { Suspense} from 'react';
import { NoSsr } from './no.ssr';
export interface NoSsrProps {
    /**
     * You can wrap a node.
     */
    children?: React.ReactNode;
    /**
     * If `true`, the component will not only prevent server-side rendering.
     * It will also defer the rendering of the children into a different screen frame.
     * @default false
     */
    defer?: boolean;
    /**
     * The fallback content to display.
     * @default null
     */
    fallback?: React.ReactNode;
  }
  
export const Suspend = ({children, defer, fallback}:NoSsrProps) => {
    return (
        <NoSsr defer={defer} fallback={fallback}>
            <Suspense fallback={fallback ?? ""}>
                {children}
            </Suspense>
        </NoSsr>
    )
}