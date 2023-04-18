import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props:any) => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="129" cy="127" r="125" /> 
    <rect x="0" y="281" rx="10" ry="10" width="280" height="32" /> 
    <rect x="4" y="343" rx="10" ry="10" width="280" height="88" /> 
    <rect x="-1" y="441" rx="12" ry="12" width="95" height="30" /> 
    <rect x="127" y="439" rx="25" ry="25" width="152" height="42" />
  </ContentLoader>
)

export default Skeleton;