import * as React from "react"
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import { styled } from "@mui/material/styles"
import Container, { ContainerProps } from "@mui/material/Container"

interface Props extends React.ComponentPropsWithRef<React.ElementType> {
    errorMessage: string
}

interface State {
    hasError: boolean
    errorMessage: string
    error: React.ErrorInfo
}

const EmptyContainer = styled(Container)<ContainerProps>({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
})

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        const { errorMessage } = props
        super(props)
        if (errorMessage) {
            this.state = { error: null, hasError: true, errorMessage }
        } else {
            this.state = { error: null, hasError: false, errorMessage: null }
        }
    }

    static getDerivedStateFromError(error: React.ErrorInfo) {
        // Update state so the next render will show the fallback UI.
        return {
            hasError: true,
            error,
            errorMessage: error.componentStack,
        }
    }

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        const { errorMessage } = nextProps
        return {
            ...prevState,
            hasError: !!errorMessage,
            errorMessage,
        }
    }

    // componentDidCatch(error, errorInfo) {
    // logErrorToMyService(error, errorInfo);
    // }

    render(): React.ReactNode {
        const { hasError, errorMessage } = this.state
        const { children } = this.props
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <EmptyContainer>
                    <Alert severity="error">
                        <AlertTitle>Something went wrong.</AlertTitle>
                        {hasError ? errorMessage : null}
                    </Alert>
                </EmptyContainer>
            )
        }
        return children
    }
}
