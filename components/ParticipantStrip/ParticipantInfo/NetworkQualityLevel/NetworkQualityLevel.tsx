import React from 'react';
import Style from './NetworkQualityLevel.style';

interface Props {
  qualityLevel?: number;
}

const NetworkQualityLevel = ({ qualityLevel }: Props) => {
  if (qualityLevel === null) return null;
  return (
    <Style.Container>
      {[0, 1, 2, 3, 4].map((level) => (
        <Style.Inner
          key={level}
          style={{
            height: `${3 * (level + 1)}px`,
            background: qualityLevel > level ? '#0c0' : '#040',
          }}
        />
      ))}
    </Style.Container>
  );
};

export default NetworkQualityLevel;
