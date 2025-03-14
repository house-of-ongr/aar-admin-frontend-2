import SoundItem from "./SoundItem";
import { ItemSoundsData } from "../../types/sound";
import { useState } from "react";
import Modal from "../modal/Modal";
import { PiMonitorPlay } from "react-icons/pi";
import ModalContent from "./PreviewContent";

type SoundListProps = {
  sounds: ItemSoundsData;
  onSoundSelect: (soundSourceId: number) => void;
};

export default function ItemSoundList({ sounds, onSoundSelect }: SoundListProps) {
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [currentSound, setCurrentSound] = useState<number | null>(null);

  const modalHandler = () => setOpenPreview((prev) => !prev);

  const previewHandler = (soundId: number) => {
    setCurrentSound(soundId);
    setOpenPreview(true);
  };
  if (sounds.soundSource.length === 0)
    return (
      <section className="w-[50%] h-full px-5  bg-black/20 ">
        <div className="text-center py-4 ">아이템 음원 목록</div>
        <p>'{sounds.itemName}' 에 소리를 등록해주세요.</p>
      </section>
    );

  return (
    <section className="w-[50%] h-full px-5  bg-black/20 overflow-auto">
      <div className="text-center py-4 ">아이템 음원 목록</div>

      <ul role="list">
        <div className="pb-2">'{sounds.itemName}' 에 기록되고 있는 소리 모음</div>
        {sounds?.soundSource.map((sound) => (
          <div key={sound.id} className="flex">
            <SoundItem sound={sound} onClick={() => onSoundSelect(sound.id!)} />
            <button onClick={() => previewHandler(sound.id!)} className="hover:text-[#F5946D] w-[10%]  ">
              <PiMonitorPlay size={20} />
            </button>
          </div>
        ))}
      </ul>
      {openPreview && currentSound !== null && (
        <Modal onClose={modalHandler} bgColor="dark">
          <ModalContent data={sounds.soundSource.find((sound) => sound.id === currentSound)!} />
        </Modal>
      )}
    </section>
  );
}
