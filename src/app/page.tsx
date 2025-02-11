import {SelectBox} from "@/shared/ui/select";

export default function BaseHome() {
  return <div>BaseHome
  <SelectBox disabled={false} options={[{id: '1', label: 'html'}, {id: '2', label: 'css'}, {id: '3', label: 'javascript'}]}></SelectBox>
  </div>
}
