import * as React from "react"
import { styled } from "@mui/material/styles"
import Container, { ContainerProps } from "@mui/material/Container"
import CircularProgress from "@mui/material/CircularProgress"

interface LoadingViewProps
    extends React.ComponentPropsWithRef<React.ElementType> {
    loading: boolean
}

const EmptyContainer = styled(Container)<ContainerProps>({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
})

function LoadingView(props: LoadingViewProps) {
    const { loading, children } = props
    if (loading) {
        return (
            <EmptyContainer>
                <CircularProgress />
            </EmptyContainer>
        )
    }
    return children
}
export default LoadingView
