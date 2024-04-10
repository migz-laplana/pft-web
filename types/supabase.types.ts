export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      CLASS: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          school_id: number | null;
          teacher_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          school_id?: number | null;
          teacher_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          school_id?: number | null;
          teacher_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_SECTION_school_fkey";
            columns: ["school_id"];
            isOneToOne: false;
            referencedRelation: "SCHOOL";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_SECTION_teacher_fkey";
            columns: ["teacher_id"];
            isOneToOne: false;
            referencedRelation: "TEACHER";
            referencedColumns: ["id"];
          }
        ];
      };
      FITNESS_TEST: {
        Row: {
          class_id: number;
          created_at: string;
          id: number;
          school_id: number;
          student_id: number;
          test_1_score: string | null;
          test_2_secore: string | null;
        };
        Insert: {
          class_id: number;
          created_at?: string;
          id?: number;
          school_id: number;
          student_id: number;
          test_1_score?: string | null;
          test_2_secore?: string | null;
        };
        Update: {
          class_id?: number;
          created_at?: string;
          id?: number;
          school_id?: number;
          student_id?: number;
          test_1_score?: string | null;
          test_2_secore?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_FITNESS_TEST_class_id_fkey";
            columns: ["class_id"];
            isOneToOne: false;
            referencedRelation: "CLASS";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_FITNESS_TEST_school_id_fkey";
            columns: ["school_id"];
            isOneToOne: false;
            referencedRelation: "SCHOOL";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_FITNESS_TEST_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "STUDENT";
            referencedColumns: ["id"];
          }
        ];
      };
      SCHOOL: {
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      STUDENT: {
        Row: {
          class_id: number | null;
          created_at: string;
          first_name: string;
          id: number;
          last_name: string;
          user_auth_uid: string | null;
        };
        Insert: {
          class_id?: number | null;
          created_at?: string;
          first_name: string;
          id?: number;
          last_name: string;
          user_auth_uid?: string | null;
        };
        Update: {
          class_id?: number | null;
          created_at?: string;
          first_name?: string;
          id?: number;
          last_name?: string;
          user_auth_uid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_STUDENT_section_fkey";
            columns: ["class_id"];
            isOneToOne: false;
            referencedRelation: "CLASS";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_STUDENT_user_auth_uid_fkey";
            columns: ["user_auth_uid"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      TEACHER: {
        Row: {
          created_at: string;
          first_name: string;
          id: number;
          last_name: string;
          user_auth_uid: string | null;
        };
        Insert: {
          created_at?: string;
          first_name: string;
          id?: number;
          last_name: string;
          user_auth_uid?: string | null;
        };
        Update: {
          created_at?: string;
          first_name?: string;
          id?: number;
          last_name?: string;
          user_auth_uid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_TEACHER_user_auth_uid_fkey";
            columns: ["user_auth_uid"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
