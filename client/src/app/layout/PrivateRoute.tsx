import { ComponentType } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/configureStore";

interface Props extends RouteProps {
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>
  roles?: string[];
}

export default function PrivateRoute({ component: Component, roles, ...rest }: Props) {
  const { user } = useAppSelector(state => state.account);
  return (
    <Route
      {...rest}
      render={props => {
        if (!user) {
          return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        }

        if (!roles?.some(r => user.roles?.includes(r))) {
          toast.error('Not authprized to access this area')
          return <Redirect to={{ pathname: "/catalog", state: { from: props.location } }} />
        }

        return <Component {...props} />
      }}
    />
  );
}