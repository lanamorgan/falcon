export const DEFAULT_CONFIG = {
  //---------
  // features

  readyIndicator: false,
  chartCount: false,
  zoomBrush: false,
  showBase: true,
  /** Use a bar chart for showing teh overall count. */
  zeroDBar: true,
  /** Use circles instead of colored rectangles. Supports showing base. */
  circleHeatmap: true,
  showInterestingness: false,
  /** Load high resolution interactions later. */
  progressiveInteractions: true,
  interpolate: false,

  //--------------
  // configuration

  maxInteractiveResolution1D: Infinity,
  maxInteractiveResolution2D: 80,
  /**
   * How long to wait before requesting high resolution data.
   * There is no delay for asynchronous databases when the dimension is activated.
   */
  progressiveTimeout: 1000,

  histogramWidth: 600,
  heatmapWidth: 450,
  maxCircleSize: 800
};

export type Config = typeof DEFAULT_CONFIG;
