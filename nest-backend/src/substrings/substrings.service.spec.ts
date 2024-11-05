import { Test, TestingModule } from '@nestjs/testing';
import { SubstringsService } from './substrings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Substring } from './substring.entity';
import { Repository } from 'typeorm';

describe('SubstringsService', () => {
  let service: SubstringsService;
  let repository: Repository<Substring>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubstringsService,
        {
          provide: getRepositoryToken(Substring),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SubstringsService>(SubstringsService);
    repository = module.get<Repository<Substring>>(
      getRepositoryToken(Substring),
    );
  });

  describe('lengthOfLongestSubstring', () => {
    it('should return 0 for an empty string', () => {
      expect(service.lengthOfLongestSubstring('')).toEqual(0);
    });

    it('should return 1 for a single character string', () => {
      expect(service.lengthOfLongestSubstring('a')).toEqual(1);
    });

    it('should return the length of the string for all unique characters', () => {
      expect(service.lengthOfLongestSubstring('abcdef')).toEqual(6);
    });

    it('should return 1 for a string with all identical characters', () => {
      expect(service.lengthOfLongestSubstring('aaaaaa')).toEqual(1);
    });

    it('should return 3 for a string with repeating characters in the middle', () => {
      expect(service.lengthOfLongestSubstring('abcabcbb')).toEqual(3);
    });

    it('should return 3 for a complex string like "pwwkew"', () => {
      expect(service.lengthOfLongestSubstring('pwwkew')).toEqual(3);
    });
  });

  describe('getUniqueSubstrings', () => {
    it('should return an empty array for an empty string', () => {
      expect(service.getUniqueSubstrings('')).toEqual([]);
    });

    it('should return an array with the single character for a one-character string', () => {
      expect(service.getUniqueSubstrings('a')).toEqual(['a']);
    });

    it('should return all unique substrings for a string with all unique characters', () => {
      expect(service.getUniqueSubstrings('abcdef')).toEqual([
        'a',
        'ab',
        'abc',
        'abcd',
        'abcde',
        'abcdef',
        'b',
        'bc',
        'bcd',
        'bcde',
        'bcdef',
        'c',
        'cd',
        'cde',
        'cdef',
        'd',
        'de',
        'def',
        'e',
        'ef',
        'f',
      ]);
    });

    it('should return only unique substrings for a string with all identical characters', () => {
      expect(service.getUniqueSubstrings('aaaaaa')).toEqual(['a']);
    });

    it('should not return substrings longer than 10 characters', () => {
      const result = service.getUniqueSubstrings('abcdefghijk');
      expect(result).not.toContain('abcdefghijk'); // Check that no substring exceeds 10 characters
      expect(result).toContain('abcdefghij'); // Check that 10-character substring is included
    });

    it('should handle complex overlapping substrings correctly', () => {
      const result = service.getUniqueSubstrings('abca');
      expect(result).toEqual(['a', 'ab', 'abc', 'b', 'bc', 'bca', 'c', 'ca']);
    });
  });
});
