import { getInitials } from '../../utils/helpers';

export default function Avatar({ src, name = '', size = 'md', className = '' }) {
  const sizes = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-12 h-12 text-base' };
  return src
    ? <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover flex-shrink-0 ${className}`} />
    : (
      <div className={`${sizes[size]} rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center flex-shrink-0 ${className}`}>
        {getInitials(name)}
      </div>
    );
}
