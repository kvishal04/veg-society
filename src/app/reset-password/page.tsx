import Reset from '@/Module/Reset'
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Reset />
    </Suspense>
  )
}

export default page



