import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
import MembershipInformationCard from "./MembershipInformationCard";

export default function MembershipsOverview() {
  const { memberhips } = useContext(AuthContext);

    return(
        <>
        <p>Test</p>
            {!memberhips ? <p>Loading...</p> :
                <MembershipInformationCard memberhip={memberhips} />
                
                }
        </>
    )
}