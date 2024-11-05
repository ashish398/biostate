// substrings/substrings.service.ts
import { Injectable } from '@nestjs/common';
import { Substring } from './substring.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class SubstringsService {
  constructor(
    @InjectRepository(Substring)
    private substringsRepository: Repository<Substring>,
  ) {}

  lengthOfLongestSubstring(s: string): number {
    let maxLength = 0;
    let start = 0;
    const usedChars = new Map();

    for (let i = 0; i < s.length; i++) {
      const currentChar = s[i];
      if (usedChars.has(currentChar) && usedChars.get(currentChar) >= start) {
        start = usedChars.get(currentChar) + 1;
      }
      usedChars.set(currentChar, i);
      maxLength = Math.max(maxLength, i - start + 1);
    }

    return maxLength;
  }

  //Order matter in the unique substrings - abcde and bcdea are considered as different
  getUniqueSubstrings(s: string): string[] {
    const seen = new Set<string>();
    for (let i = 0; i < s.length; i++) {
      const charSet = new Set();
      let substring = '';
      for (let j = i; j < s.length && substring.length < 10; j++) {
        if (charSet.has(s[j])) break;
        charSet.add(s[j]);
        substring += s[j];

        seen.add(substring);
      }
    }
    return Array.from(seen);
  }

  async saveSubstring(input: string, user: any): Promise<Substring> {
    const longestSubstringLength = this.lengthOfLongestSubstring(input);
    const uniqueSubstrings = this.getUniqueSubstrings(input);
    const substring = this.substringsRepository.create({
      input,
      longestSubstringLength,
      uniqueSubstrings,
      user: { id: user.userId } as User,
    });

    return this.substringsRepository.save(substring);
  }

  calculateSubstringResult(input: string): {
    input: string;
    longestSubstringLength: number;
    uniqueSubstrings: string[];
  } {
    const longestSubstringLength = this.lengthOfLongestSubstring(input);
    const uniqueSubstrings = this.getUniqueSubstrings(input);

    return { input, longestSubstringLength, uniqueSubstrings };
  }

  async saveSubstringResult(result: any, user: any): Promise<Substring> {
    const substring = this.substringsRepository.create({
      input: result.input,
      longestSubstringLength: result.longestSubstringLength,
      uniqueSubstrings: result.uniqueSubstrings,
      user: { id: user.userId } as User,
    });

    return this.substringsRepository.save(substring);
  }

  async getSubstrings(): Promise<Substring[]> {
    return this.substringsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getSubstringsForUser(user: any): Promise<Substring[]> {
    return this.substringsRepository.find({
      where: { user: user.userId },
      order: { createdAt: 'DESC' },
    });
  }
}
