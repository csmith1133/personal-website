#!/usr/bin/env python3
"""
Test Data Generator for Supabase Financial Data

This script generates realistic financial test data and uploads it to Supabase.
It creates budget and actual transaction data for development/testing purposes.

Usage:
    python scripts/generate_test_data.py

Environment Variables Required:
    SUPABASE_URL - Your Supabase project URL
    SUPABASE_SERVICE_KEY - Your Supabase service role key
"""

import hashlib
import os
import random
from datetime import datetime

import numpy as np
import pandas as pd
from dotenv import load_dotenv
from supabase import create_client

# Load environment variables from .env file
load_dotenv()

# -------- SUPABASE SETTINGS --------
SUPABASE_URL = "https://tdidlbvxkjvoazuiwqdq.supabase.co"
VAULT_SECRET_NAME = "SUPABASE_SERVICE_KEY"
ACTUALS_TABLE = "financial_actuals_granular"
BUDGET_TABLE = "financial_budget_weekly"

# Validate required environment variables
if not SUPABASE_URL:
    raise ValueError("SUPABASE_URL environment variable is required")


def get_anon_key_securely():
    """Get anon key securely without storing it locally."""
    import sys

    # Check if provided as command line argument
    if len(sys.argv) > 1:
        print("🔑 Using anon key from command line argument")
        return sys.argv[1].strip()

    # Fallback to interactive input
    print("\n🔑 Supabase anon key needed to access vault (not stored locally)")
    print("   Get this from: Supabase Dashboard → Settings → API → 'anon public' key")
    print("   Note: This is the public anon key, safe to enter here")
    print(
        "   Alternative: Run with: python3 scripts/generate_test_data.py YOUR_ANON_KEY\n"
    )

    try:
        anon_key = input("Enter your Supabase anon key: ").strip()
    except (EOFError, KeyboardInterrupt):
        print("\n❌ Key input cancelled")
        print(
            "💡 Tip: Try running with: python3 scripts/generate_test_data.py YOUR_ANON_KEY"
        )
        sys.exit(1)

    if not anon_key:
        raise ValueError("Anon key is required to access Supabase Vault")

    return anon_key


def get_service_key_from_vault():
    """Fetch the service key from Supabase Vault."""
    print("🔐 Fetching service key from Supabase Vault...")

    # Get anon key securely at runtime
    anon_key = get_anon_key_securely()

    # Create client with anon key to access vault
    vault_client = create_client(SUPABASE_URL, anon_key)

    try:
        # Fetch secret from vault
        response = vault_client.rpc(
            "get_secret", {"secret_name": VAULT_SECRET_NAME}
        ).execute()

        if response.data:
            print("✅ Service key retrieved from vault")
            return response.data
        else:
            raise ValueError(
                f"Secret '{VAULT_SECRET_NAME}' not found in Supabase Vault"
            )

    except Exception as e:
        print(f"❌ Failed to get secret from vault: {e}")
        # Fallback to local environment variable
        print("🔄 Falling back to local SUPABASE_SERVICE_KEY environment variable...")
        service_key = os.getenv("SUPABASE_SERVICE_KEY")
        if not service_key:
            raise ValueError(
                "Neither Supabase Vault nor SUPABASE_SERVICE_KEY environment variable available"
            )
        return service_key


# -----------------------------------


def make_budgetid(week, category, line_item):
    """Generate a unique budget ID hash."""
    key = f"{week}|{category}|{line_item}"
    return hashlib.sha1(key.encode()).hexdigest()


def make_actualid(row):
    """Generate a unique actual transaction ID hash."""
    key = f"{row['date']}|{row['line_item']}|{row['category']}|{row['budgetid']}|{row['amount']}|{row['description']}"
    return hashlib.sha1(key.encode()).hexdigest()


# Configuration for realistic financial data
n_years = 3
weeks = pd.date_range("2021-01-01", periods=52 * n_years, freq="W-MON")
categories = {
    "Revenue": ["Sales Revenue", "Service Revenue", "Interest Income", "Other Income"],
    "COGS": ["Raw Materials", "Direct Labor", "Manufacturing Overhead"],
    "General & Administrative": [
        "Salaries & Wages",
        "Office Supplies",
        "Rent",
        "Utilities",
        "Insurance",
        "Depreciation",
    ],
    "Sales & Marketing": [
        "Advertising",
        "Marketing Campaigns",
        "Sales Commissions",
        "Travel Expenses",
    ],
    "Research & Development": [
        "R&D Salaries",
        "Prototyping Materials",
        "Software Licenses",
    ],
    "IT & Infrastructure": [
        "Software Subscriptions",
        "Hardware Purchases",
        "Cloud Hosting",
    ],
    "Other Expenses": ["Interest Expense", "Taxes", "Legal & Professional Fees"],
}
all_line_items = [(cat, item) for cat, items in categories.items() for item in items]


def realistic_amount(cat, item):
    """Generate realistic amounts based on category and line item."""
    if cat == "Revenue":
        if item == "Sales Revenue":
            return np.random.normal(9000000, 400000)
        elif item == "Service Revenue":
            return np.random.normal(800000, 80000)
        elif item == "Interest Income":
            return np.random.normal(75000, 25000)
        elif item == "Other Income":
            return np.random.normal(125000, 50000)
    elif cat == "COGS":
        if item == "Raw Materials":
            return np.random.normal(-3500000, 200000)
        elif item == "Direct Labor":
            return np.random.normal(-2000000, 150000)
        elif item == "Manufacturing Overhead":
            return np.random.normal(-850000, 50000)
    elif cat == "General & Administrative":
        if item == "Salaries & Wages":
            return np.random.normal(-600000, 50000)
        elif item == "Office Supplies":
            return np.random.normal(-25000, 4000)
        elif item == "Rent":
            return np.random.normal(-80000, 9000)
        elif item == "Utilities":
            return np.random.normal(-15000, 2500)
        elif item == "Insurance":
            return np.random.normal(-12000, 2000)
        elif item == "Depreciation":
            return np.random.normal(-25000, 4000)
    elif cat == "Sales & Marketing":
        if item == "Advertising":
            return np.random.normal(-90000, 15000)
        elif item == "Marketing Campaigns":
            return np.random.normal(-25000, 6000)
        elif item == "Sales Commissions":
            return np.random.normal(-32000, 7000)
        elif item == "Travel Expenses":
            return np.random.normal(-12000, 3000)
    elif cat == "Research & Development":
        if item == "R&D Salaries":
            return np.random.normal(-40000, 9000)
        elif item == "Prototyping Materials":
            return np.random.normal(-8000, 1500)
        elif item == "Software Licenses":
            return np.random.normal(-5000, 1000)
    elif cat == "IT & Infrastructure":
        if item == "Software Subscriptions":
            return np.random.normal(-7000, 1200)
        elif item == "Hardware Purchases":
            return np.random.normal(-15000, 2500)
        elif item == "Cloud Hosting":
            return np.random.normal(-12000, 2000)
    elif cat == "Other Expenses":
        if item == "Interest Expense":
            return np.random.normal(-9000, 2000)
        elif item == "Taxes":
            return np.random.normal(-55000, 5000)
        elif item == "Legal & Professional Fees":
            return np.random.normal(-7000, 1500)
    return np.random.normal(-5000, 1000)


def generate_data():
    """Generate budget and actuals DataFrames."""
    print("Generating budget data...")
    budget = []
    budget_lookup = {}

    for week in weeks:
        week_str = week.strftime("%Y-%m-%d")
        for cat, item in all_line_items:
            budgetid = make_budgetid(week_str, cat, item)
            budgeted = realistic_amount(cat, item)
            budget.append(
                {
                    "budgetid": budgetid,
                    "week": week_str,
                    "line_item": item,
                    "category": cat,
                    "budgeted_amount": round(budgeted, 2),
                    "last_updated": datetime.utcnow().isoformat(),
                }
            )
            budget_lookup[(week_str, cat, item)] = budgetid
    budget_df = pd.DataFrame(budget)

    print("Generating actuals data...")
    actuals = []
    for week in weeks:
        week_str = week.strftime("%Y-%m-%d")
        for cat, item in all_line_items:
            n_trans = (
                random.randint(5, 30) if cat == "Revenue" else random.randint(2, 8)
            )
            total_amount = realistic_amount(cat, item)
            for _ in range(n_trans):
                day_offset = random.randint(0, 6)
                date = week + pd.Timedelta(days=day_offset)
                amount = total_amount / n_trans + np.random.normal(
                    0, abs(total_amount / n_trans * 0.15)
                )
                row = {
                    "date": date.strftime("%Y-%m-%d"),
                    "line_item": item,
                    "amount": round(amount, 2),
                    "category": cat,
                    "description": f"{cat} - {item} transaction on {date.strftime('%Y-%m-%d')}",
                    "budgetid": budget_lookup[(week_str, cat, item)],
                    "last_updated": datetime.utcnow().isoformat(),
                }
                row["actualid"] = make_actualid(row)
                actuals.append(row)
    actuals_df = pd.DataFrame(actuals)

    print(
        f"Generated {len(budget_df)} budget records and {len(actuals_df)} actual records"
    )
    return budget_df, actuals_df


def smart_sync_budget_table(sb_client, table_name, df, key_col, chunk_size=500):
    """Intelligently sync budget table - upsert new/changed, delete stale."""
    print(f"Smart-syncing {table_name}...")
    df = df.drop_duplicates(subset=[key_col])

    # Upsert all records
    sb_client.table(table_name).upsert(df.to_dict(orient="records")).execute()

    # Get current keys and delete stale ones
    keys = df[key_col].tolist()
    all_rows = sb_client.table(table_name).select(key_col).execute().data
    all_db_keys = [row[key_col] for row in all_rows]
    keys_to_delete = list(set(all_db_keys) - set(keys))

    if keys_to_delete:
        print(f"Deleting {len(keys_to_delete)} stale keys from {table_name}")
        for i in range(0, len(keys_to_delete), chunk_size):
            chunk = keys_to_delete[i : i + chunk_size]
            sb_client.table(table_name).delete().in_(key_col, chunk).execute()

    print(f"✅ Smart-synced {table_name}")


def full_replace_actuals(sb_client, table_name, df):
    """Completely replace all actuals data."""
    print(f"Replacing all data in {table_name}...")

    # Delete all existing records
    print("Deleting all existing records...")
    sb_client.table(table_name).delete().neq("actualid", "").execute()

    # Insert new records in chunks to avoid timeouts
    chunk_size = 1000
    total_records = len(df)
    records = df.to_dict(orient="records")

    print(f"Inserting {total_records} new records...")
    for i in range(0, total_records, chunk_size):
        chunk = records[i : i + chunk_size]
        sb_client.table(table_name).insert(chunk).execute()
        print(
            f"Inserted chunk {i//chunk_size + 1}/{(total_records + chunk_size - 1)//chunk_size}"
        )

    print(f"✅ Replaced all data in {table_name}")


def main():
    """Main execution function."""
    print("🚀 Starting test data generation...")
    print(f"Target Supabase: {SUPABASE_URL}")

    # Get service key from vault
    service_key = get_service_key_from_vault()

    # Generate data
    budget_df, actuals_df = generate_data()

    # Connect to Supabase with service key from vault
    print("Connecting to Supabase with service role...")
    sb = create_client(SUPABASE_URL, service_key)

    # Sync data to Supabase
    smart_sync_budget_table(sb, BUDGET_TABLE, budget_df, "budgetid")
    full_replace_actuals(sb, ACTUALS_TABLE, actuals_df)

    print("✅ Upload complete!")
    print(f"📊 Budget records: {len(budget_df)}")
    print(f"📈 Actual records: {len(actuals_df)}")


if __name__ == "__main__":
    main()
