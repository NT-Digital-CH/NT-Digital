type ScrollProgressProps = {
  progress: number;
};

export function ScrollProgress({ progress }: ScrollProgressProps) {
  return <div id="scroll-progress" aria-hidden="true" style={{ width: `${progress}%` }} />;
}
