import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  lazy?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * @function Custom image component
 * @param {ImageProps} param0
 * @returns {JSX.Element}
 */
const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width = 'auto',
  height = 'auto',
  className = '',
  lazy = true,
  objectFit = 'cover',
}): JSX.Element => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={lazy ? 'lazy' : 'eager'}
      className={`object-${objectFit} ${className}`}
    />
  );
};

export default Image;
