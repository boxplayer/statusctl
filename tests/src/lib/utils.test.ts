import { describe, it, expect } from 'vitest';
import { cn } from '../../../src/lib/utils';

describe('cn utility function', () => {
  it('should merge simple class names', () => {
    const result = cn('px-4', 'py-2', 'bg-blue-500');
    expect(result).toBe('px-4 py-2 bg-blue-500');
  });

  it('should handle conditional classes', () => {
    const result = cn('base-class', true && 'conditional-class', false && 'hidden-class');
    expect(result).toBe('base-class conditional-class');
  });

  it('should merge conflicting Tailwind classes', () => {
    const result = cn('px-4 px-2', 'py-2 py-4');
    expect(result).toBe('px-2 py-4');
  });

  it('should handle empty inputs', () => {
    const result = cn('', null, undefined, false);
    expect(result).toBe('');
  });

  it('should handle arrays of classes', () => {
    const result = cn(['px-4', 'py-2'], ['bg-blue-500', 'text-white']);
    expect(result).toBe('px-4 py-2 bg-blue-500 text-white');
  });

  it('should handle objects with conditional values', () => {
    const result = cn({
      'px-4': true,
      'py-2': true,
      'bg-red-500': false,
      'bg-blue-500': true,
    });
    expect(result).toBe('px-4 py-2 bg-blue-500');
  });

  it('should handle complex mixed inputs', () => {
    const isActive = true;
    const size = 'large';
    
    const result = cn(
      'base-class',
      isActive && 'active',
      size === 'large' ? 'text-lg' : 'text-sm',
      ['flex', 'items-center'],
      { 'font-bold': isActive, 'opacity-50': !isActive }
    );
    
    expect(result).toBe('base-class active text-lg flex items-center font-bold');
  });

  it('should prioritize later conflicting classes', () => {
    const result = cn('text-sm', 'text-lg', 'text-xl');
    expect(result).toBe('text-xl');
  });

  it('should handle whitespace correctly', () => {
    const result = cn('  px-4  ', '  py-2  ');
    expect(result).toBe('px-4 py-2');
  });
});