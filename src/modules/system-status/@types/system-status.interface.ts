export interface SystemStatus {
  environment: Record<string, unknown>;
  database: Record<string, unknown>;
  active_plugins: Record<string, unknown>[];
  theme: Record<string, unknown>;
  settings: Record<string, unknown>;
  security: Record<string, unknown>;
  pages: Record<string, unknown>[];
  post_type_counts: Record<string, unknown>[];
}

export interface SystemStatusTool {
  id: string;
  name: string;
  action: string;
  description: string;
  success?: boolean;
  message?: string;
}
