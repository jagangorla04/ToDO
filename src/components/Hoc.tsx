import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "./store";
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function withRouter(Component: any) {
  return function (props: any) {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const location=useLocation()
    const selector=useAppSelector((state)=>state.ecommerce)
    return <Component {...props} selector={selector}  dispatch={dispatch} navigate={navigate} location={location} />;
  };
}
