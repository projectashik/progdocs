export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      docs: {
        Row: {
          created_at: string | null
          description: string | null
          domain: string | null
          folder: string | null
          head: string | null
          id: number
          subdomain: string
          title: string | null
          userId: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          domain?: string | null
          folder?: string | null
          head?: string | null
          id?: number
          subdomain: string
          title?: string | null
          userId: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          domain?: string | null
          folder?: string | null
          head?: string | null
          id?: number
          subdomain?: string
          title?: string | null
          userId?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
