import { Icon, MyStateHook, MyEffectHook } from "@components/components.js";
function App() {
  return (
    <>
      <MyStateHook name="test" />
      <MyEffectHook apiUrl={'https://jsonplaceholder.typicode.com/users'} />
      <Icon className="bg-amber-300" iconName="test"/>
    </>
  )
}

export default App

