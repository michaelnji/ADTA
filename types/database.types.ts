export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  api: {
    Tables: {
      COUNTRIES: {
        Row: {
          code2: string | null
          code3: string | null
          codeNo: number | null
          country: string | null
          countryRiskPremium: string | null
          currency: string | null
          currencyCode: string | null
          defaultSpread: string | null
          equityRiskPremium: string | null
          id: string
          rating: string | null
          region: string | null
          subRegion: string | null
        }
        Insert: {
          code2?: string | null
          code3?: string | null
          codeNo?: number | null
          country?: string | null
          countryRiskPremium?: string | null
          currency?: string | null
          currencyCode?: string | null
          defaultSpread?: string | null
          equityRiskPremium?: string | null
          id?: string
          rating?: string | null
          region?: string | null
          subRegion?: string | null
        }
        Update: {
          code2?: string | null
          code3?: string | null
          codeNo?: number | null
          country?: string | null
          countryRiskPremium?: string | null
          currency?: string | null
          currencyCode?: string | null
          defaultSpread?: string | null
          equityRiskPremium?: string | null
          id?: string
          rating?: string | null
          region?: string | null
          subRegion?: string | null
        }
        Relationships: []
      }
      EXCHANGES: {
        Row: {
          code: string | null
          country: string | null
          created_at: string
          exchange_type: string
          id: string
          name: string
          timezone: string | null
        }
        Insert: {
          code?: string | null
          country?: string | null
          created_at?: string
          exchange_type: string
          id: string
          name: string
          timezone?: string | null
        }
        Update: {
          code?: string | null
          country?: string | null
          created_at?: string
          exchange_type?: string
          id?: string
          name?: string
          timezone?: string | null
        }
        Relationships: []
      }
      "STOCKS LIST": {
        Row: {
          currency: string | null
          description: string | null
          displaySymbol: string | null
          figi: string | null
          id: string
          isin: string | null
          mic: string | null
          price: string | null
          shareClassFIGI: string | null
          symbol: string | null
          symbol2: string | null
          type: string | null
          volume: string | null
        }
        Insert: {
          currency?: string | null
          description?: string | null
          displaySymbol?: string | null
          figi?: string | null
          id?: string
          isin?: string | null
          mic?: string | null
          price?: string | null
          shareClassFIGI?: string | null
          symbol?: string | null
          symbol2?: string | null
          type?: string | null
          volume?: string | null
        }
        Update: {
          currency?: string | null
          description?: string | null
          displaySymbol?: string | null
          figi?: string | null
          id?: string
          isin?: string | null
          mic?: string | null
          price?: string | null
          shareClassFIGI?: string | null
          symbol?: string | null
          symbol2?: string | null
          type?: string | null
          volume?: string | null
        }
        Relationships: []
      }
      "TOP STOCKS LIST": {
        Row: {
          displaySymbol: string
          float: string | null
          id: string
          perc_chnge: string | null
          points: number | null
          position: number | null
          previous_close: string | null
          rv: string | null
          sentiment: string | null
          volume: string
          year_high: string | null
          year_low: string | null
        }
        Insert: {
          displaySymbol: string
          float?: string | null
          id?: string
          perc_chnge?: string | null
          points?: number | null
          position?: number | null
          previous_close?: string | null
          rv?: string | null
          sentiment?: string | null
          volume: string
          year_high?: string | null
          year_low?: string | null
        }
        Update: {
          displaySymbol?: string
          float?: string | null
          id?: string
          perc_chnge?: string | null
          points?: number | null
          position?: number | null
          previous_close?: string | null
          rv?: string | null
          sentiment?: string | null
          volume?: string
          year_high?: string | null
          year_low?: string | null
        }
        Relationships: []
      }
      "TOP STOCKS LIST WTCHLIST": {
        Row: {
          displaySymbol: string
          float: string | null
          id: string
          perc_chnge: string | null
          points: number | null
          position: number | null
          previous_close: string | null
          rv: string | null
          sentiment: string | null
          volume: string
          year_high: string | null
          year_low: string | null
        }
        Insert: {
          displaySymbol: string
          float?: string | null
          id?: string
          perc_chnge?: string | null
          points?: number | null
          position?: number | null
          previous_close?: string | null
          rv?: string | null
          sentiment?: string | null
          volume: string
          year_high?: string | null
          year_low?: string | null
        }
        Update: {
          displaySymbol?: string
          float?: string | null
          id?: string
          perc_chnge?: string | null
          points?: number | null
          position?: number | null
          previous_close?: string | null
          rv?: string | null
          sentiment?: string | null
          volume?: string
          year_high?: string | null
          year_low?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      "Currency Group": "Exotic" | "Exotic-Cross" | "Major" | "Minor"
      "exchange type": "Forex" | "Cryptocurrency"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
