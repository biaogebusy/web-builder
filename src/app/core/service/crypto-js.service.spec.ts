import { TestBed } from '@angular/core/testing';
import { CryptoJSService } from '@core/service/crypto-js.service';

describe('CryptoJSService', () => {
  let service: CryptoJSService;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoJSService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  describe('randomString', () => {
    it('returns a string of the requested length', () => {
      expect(service.randomString(16)).toHaveLength(16);
    });

    it('defaults to 32 characters for a falsy length', () => {
      expect(service.randomString(0)).toHaveLength(32);
    });

    it('only uses the unambiguous alphabet', () => {
      expect(service.randomString(200)).toMatch(/^[A-HJ-NP-TWXYZa-fhijkmnprstwxyz2-8]+$/);
    });
  });

  describe('encrypt / decrypt', () => {
    it('round-trips a value', () => {
      const cipher = service.encrypt('secret-password');

      expect(cipher).not.toBe('secret-password');
      expect(service.decrypt(cipher)).toBe('secret-password');
    });

    it('round-trips non-ascii content', () => {
      expect(service.decrypt(service.encrypt('用户名：管理员'))).toBe('用户名：管理员');
    });

    it('produces a different ciphertext each time for the same input', () => {
      // AES here uses a random salt/IV, so ciphertexts must not be comparable
      expect(service.encrypt('same')).not.toBe(service.encrypt('same'));
    });

    it('decrypts to an empty string when the input is not a valid ciphertext', () => {
      expect(service.decrypt('not-a-cipher-text')).toBe('');
    });
  });
});
