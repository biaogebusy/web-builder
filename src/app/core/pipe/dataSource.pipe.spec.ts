import { MatTableDataSource } from '@angular/material/table';
import { DataSourcePipe } from '@core/pipe/dataSource.pipe';

describe('DataSourcePipe', () => {
  const pipe = new DataSourcePipe();

  it('wraps an array in a MatTableDataSource', () => {
    const data = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }];

    const result = pipe.transform(data);

    expect(result).toBeInstanceOf(MatTableDataSource);
    expect(result.data).toEqual(data);
  });

  it('returns an empty MatTableDataSource for a falsy array', () => {
    expect(pipe.transform(null as never)).toBeInstanceOf(MatTableDataSource);
    expect(pipe.transform(null as never).data).toEqual([]);

    expect(pipe.transform(undefined as never)).toBeInstanceOf(MatTableDataSource);
    expect(pipe.transform(undefined as never).data).toEqual([]);
  });

  it('returns an empty MatTableDataSource for an empty array', () => {
    const result = pipe.transform([]);
    expect(result).toBeInstanceOf(MatTableDataSource);
    expect(result.data).toEqual([]);
  });

  it('creates a fresh DataSource each call (independent instances)', () => {
    const a = pipe.transform([{ id: 1 }]);
    const b = pipe.transform([{ id: 2 }]);

    expect(a).not.toBe(b);
    expect(a.data).toEqual([{ id: 1 }]);
    expect(b.data).toEqual([{ id: 2 }]);
  });
});
