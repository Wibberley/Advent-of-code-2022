class TaskResponse {
  get marker(): string {
    return this._markers.join('');
  }

  get index(): number {
    return this._index;
  }

  private _index = 0;
  private _markers: string[] = [];

  constructor(private _distintCharacters: number) {}

  public validMarker(): boolean {
    if (this._markers.length < this._distintCharacters) {
      return false;
    }

    return !/(.).*\1/.test(this.marker);
  }

  public addMarker(marker: string) {
    if (this._markers.length === this._distintCharacters) {
      this._markers.splice(0, 1);
    }

    this._markers.push(marker);

    this._index++;
  }
}

class DaySixPuzzle {
  constructor(private puzzleInput: string) {}

  public calculateTaskOne(): TaskResponse {
    const buffer = [...this.puzzleInput];
    const response = new TaskResponse(4);
    for (const marker of buffer) {
      response.addMarker(marker);
      if (response.validMarker()) {
        break;
      }
    }
    return response;
  }

  public calculateTaskTwo(): TaskResponse {
    const buffer = [...this.puzzleInput];
    const response = new TaskResponse(14);
    for (const marker of buffer) {
      response.addMarker(marker);
      if (response.validMarker()) {
        break;
      }
    }
    return response;
  }
}

export default DaySixPuzzle;
