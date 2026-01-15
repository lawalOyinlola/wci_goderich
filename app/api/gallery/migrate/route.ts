import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import type { GalleryOrientation } from "@/lib/types/gallery";

interface SampleGalleryImage {
  title: string;
  description: string;
  image_url: string;
  alt_text: string;
  orientation: GalleryOrientation;
  category: string;
  featured: boolean;
  display_order: number;
  created_at?: string; // Optional: will be set to distribute across months
}

// Helper function to generate dates distributed across months
function getDateForMonth(month: number, day: number = 15): string {
  const currentYear = new Date().getFullYear();
  const date = new Date(currentYear, month - 1, day);
  return date.toISOString();
}

// Sample gallery images with different orientations - 60 images total
// Distributed across 12 months (5 images per month)
const SAMPLE_GALLERY_IMAGES: SampleGalleryImage[] = [
  // January (5 images)
  {
    title: "New Year Service",
    description: "Celebrating the new year with prayer and worship",
    image_url:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop&q=80",
    alt_text: "New Year service celebration",
    orientation: "landscape",
    category: "Services",
    featured: true,
    display_order: 1,
    created_at: getDateForMonth(1, 5),
  },
  {
    title: "January Prayer Meeting",
    description: "First prayer meeting of the year",
    image_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop&q=80",
    alt_text: "January prayer meeting",
    orientation: "portrait",
    category: "Services",
    featured: false,
    display_order: 2,
    created_at: getDateForMonth(1, 10),
  },
  {
    title: "Winter Fellowship",
    description: "Church members gathering for winter fellowship",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop&q=80",
    alt_text: "Winter fellowship event",
    orientation: "landscape",
    category: "Events",
    featured: false,
    display_order: 3,
    created_at: getDateForMonth(1, 15),
  },
  {
    title: "Sunday School Class",
    description: "Children learning in Sunday school",
    image_url:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=800&fit=crop&q=80",
    alt_text: "Sunday school class",
    orientation: "square",
    category: "Education",
    featured: false,
    display_order: 4,
    created_at: getDateForMonth(1, 20),
  },
  {
    title: "Bible Study Session",
    description: "Deep dive into scripture study",
    image_url:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=1200&fit=crop&q=80",
    alt_text: "Bible study session",
    orientation: "portrait",
    category: "Education",
    featured: true,
    display_order: 5,
    created_at: getDateForMonth(1, 25),
  },

  // February (5 images)
  {
    title: "Valentine's Day Service",
    description: "Celebrating love and fellowship",
    image_url:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=800&fit=crop&q=80",
    alt_text: "Valentine's Day service",
    orientation: "landscape",
    category: "Services",
    featured: true,
    display_order: 6,
    created_at: getDateForMonth(2, 5),
  },
  {
    title: "Youth Conference",
    description: "Annual youth conference gathering",
    image_url:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=1200&fit=crop&q=80",
    alt_text: "Youth conference event",
    orientation: "portrait",
    category: "Events",
    featured: true,
    display_order: 7,
    created_at: getDateForMonth(2, 10),
  },
  {
    title: "Choir Rehearsal",
    description: "Choir preparing for upcoming service",
    image_url:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop&q=80",
    alt_text: "Choir rehearsal",
    orientation: "landscape",
    category: "Services",
    featured: false,
    display_order: 8,
    created_at: getDateForMonth(2, 15),
  },
  {
    title: "Women's Ministry Meeting",
    description: "Women gathering for ministry discussion",
    image_url:
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&h=800&fit=crop&q=80",
    alt_text: "Women's ministry meeting",
    orientation: "square",
    category: "Events",
    featured: false,
    display_order: 9,
    created_at: getDateForMonth(2, 20),
  },
  {
    title: "Pastor's Sermon",
    description: "Pastor delivering inspiring message",
    image_url:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=1200&fit=crop&q=80",
    alt_text: "Pastor giving sermon",
    orientation: "portrait",
    category: "Services",
    featured: true,
    display_order: 10,
    created_at: getDateForMonth(2, 25),
  },

  // March (5 images)
  {
    title: "Spring Revival Service",
    description: "Spring revival and renewal service",
    image_url:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=800&fit=crop&q=80",
    alt_text: "Spring revival service",
    orientation: "landscape",
    category: "Services",
    featured: true,
    display_order: 11,
    created_at: getDateForMonth(3, 5),
  },
  {
    title: "Baptism Service",
    description: "Celebrating new believers in baptism",
    image_url:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=1200&fit=crop&q=80",
    alt_text: "Baptism service ceremony",
    orientation: "portrait",
    category: "Services",
    featured: true,
    display_order: 12,
    created_at: getDateForMonth(3, 10),
  },
  {
    title: "Community Outreach",
    description: "Church members serving the community",
    image_url:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&q=80",
    alt_text: "Community outreach program",
    orientation: "landscape",
    category: "Events",
    featured: true,
    display_order: 13,
    created_at: getDateForMonth(3, 15),
  },
  {
    title: "Men's Fellowship Breakfast",
    description: "Men gathering for fellowship and breakfast",
    image_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&q=80",
    alt_text: "Men's fellowship breakfast",
    orientation: "square",
    category: "Events",
    featured: false,
    display_order: 14,
    created_at: getDateForMonth(3, 20),
  },
  {
    title: "Children's Playtime",
    description: "Children having fun during church activities",
    image_url:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1200&fit=crop&q=80",
    alt_text: "Children playing at church",
    orientation: "portrait",
    category: "Events",
    featured: false,
    display_order: 15,
    created_at: getDateForMonth(3, 25),
  },

  // April (5 images)
  {
    title: "Easter Sunday Service",
    description: "Easter Sunday celebration service",
    image_url:
      "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=1200&h=800&fit=crop&q=80",
    alt_text: "Easter Sunday service",
    orientation: "landscape",
    category: "Services",
    featured: true,
    display_order: 16,
    created_at: getDateForMonth(4, 5),
  },
  {
    title: "Easter Celebration",
    description: "Celebrating the resurrection of Christ",
    image_url:
      "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&h=800&fit=crop&q=80",
    alt_text: "Easter celebration",
    orientation: "square",
    category: "Events",
    featured: true,
    display_order: 17,
    created_at: getDateForMonth(4, 10),
  },
  {
    title: "Good Friday Service",
    description: "Reflecting on the sacrifice of Christ",
    image_url:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=1200&fit=crop&q=80",
    alt_text: "Good Friday service",
    orientation: "portrait",
    category: "Services",
    featured: true,
    display_order: 18,
    created_at: getDateForMonth(4, 15),
  },
  {
    title: "Spring Picnic",
    description: "Church family enjoying spring picnic",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop&q=80",
    alt_text: "Spring picnic event",
    orientation: "landscape",
    category: "Events",
    featured: false,
    display_order: 19,
    created_at: getDateForMonth(4, 20),
  },
  {
    title: "Praise and Worship",
    description: "Worship team leading the congregation",
    image_url:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=1200&fit=crop&q=80",
    alt_text: "Worship team performing",
    orientation: "portrait",
    category: "Services",
    featured: false,
    display_order: 20,
    created_at: getDateForMonth(4, 25),
  },

  // May (5 images)
  {
    title: "Mother's Day Service",
    description: "Honoring mothers in our congregation",
    image_url:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=800&fit=crop&q=80",
    alt_text: "Mother's Day service",
    orientation: "landscape",
    category: "Services",
    featured: true,
    display_order: 21,
    created_at: getDateForMonth(5, 5),
  },
  {
    title: "Church Building",
    description: "Our beautiful church building exterior",
    image_url:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=800&fit=crop&q=80",
    alt_text: "Church building exterior",
    orientation: "square",
    category: "Services",
    featured: true,
    display_order: 22,
    created_at: getDateForMonth(5, 10),
  },
  {
    title: "Altar Decorations",
    description: "Beautifully decorated altar",
    image_url:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=1200&fit=crop&q=80",
    alt_text: "Church altar decorations",
    orientation: "portrait",
    category: "Services",
    featured: false,
    display_order: 23,
    created_at: getDateForMonth(5, 15),
  },
  {
    title: "Youth Group Activity",
    description: "Youth group engaging in activities",
    image_url:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&q=80",
    alt_text: "Youth group activity",
    orientation: "landscape",
    category: "Events",
    featured: false,
    display_order: 24,
    created_at: getDateForMonth(5, 20),
  },
  {
    title: "Prayer Circle",
    description: "Members gathering in prayer circle",
    image_url:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=1200&fit=crop&q=80",
    alt_text: "Prayer circle gathering",
    orientation: "portrait",
    category: "Services",
    featured: false,
    display_order: 25,
    created_at: getDateForMonth(5, 25),
  },

  // June (5 images)
  {
    title: "Summer Service",
    description: "Sunday service during summer",
    image_url:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=800&fit=crop&q=80",
    alt_text: "Summer service",
    orientation: "landscape",
    category: "Services",
    featured: false,
    display_order: 26,
    created_at: getDateForMonth(6, 5),
  },
  {
    title: "Father's Day Celebration",
    description: "Honoring fathers in our church",
    image_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop&q=80",
    alt_text: "Father's Day celebration",
    orientation: "portrait",
    category: "Events",
    featured: true,
    display_order: 27,
    created_at: getDateForMonth(6, 10),
  },
  {
    title: "Vacation Bible School",
    description: "Children learning at VBS",
    image_url:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop&q=80",
    alt_text: "Vacation Bible School",
    orientation: "landscape",
    category: "Education",
    featured: true,
    display_order: 28,
    created_at: getDateForMonth(6, 15),
  },
  {
    title: "Summer Camp",
    description: "Youth summer camp activities",
    image_url:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=800&fit=crop&q=80",
    alt_text: "Summer camp",
    orientation: "square",
    category: "Events",
    featured: false,
    display_order: 29,
    created_at: getDateForMonth(6, 20),
  },
  {
    title: "Sunday Morning Worship",
    description: "Congregation gathered for worship",
    image_url:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=1200&fit=crop&q=80",
    alt_text: "Sunday morning worship",
    orientation: "portrait",
    category: "Services",
    featured: false,
    display_order: 30,
    created_at: getDateForMonth(6, 25),
  },

  // July (5 images)
  {
    title: "Independence Day Service",
    description: "Celebrating independence and freedom",
    image_url:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=800&fit=crop&q=80",
    alt_text: "Independence Day service",
    orientation: "landscape",
    category: "Services",
    featured: true,
    display_order: 31,
    created_at: getDateForMonth(7, 5),
  },
  {
    title: "Summer Picnic",
    description: "Church family summer picnic",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=1200&fit=crop&q=80",
    alt_text: "Summer picnic",
    orientation: "portrait",
    category: "Events",
    featured: false,
    display_order: 32,
    created_at: getDateForMonth(7, 10),
  },
  {
    title: "Choir Performance",
    description: "Church choir performing",
    image_url:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=800&fit=crop&q=80",
    alt_text: "Choir performance",
    orientation: "landscape",
    category: "Services",
    featured: false,
    display_order: 33,
    created_at: getDateForMonth(7, 15),
  },
  {
    title: "Bible Study Group",
    description: "Small group Bible study",
    image_url:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=800&fit=crop&q=80",
    alt_text: "Bible study group",
    orientation: "square",
    category: "Education",
    featured: false,
    display_order: 34,
    created_at: getDateForMonth(7, 20),
  },
  {
    title: "Evening Service",
    description: "Evening worship service",
    image_url:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=1200&fit=crop&q=80",
    alt_text: "Evening service",
    orientation: "portrait",
    category: "Services",
    featured: false,
    display_order: 35,
    created_at: getDateForMonth(7, 25),
  },

  // August (5 images)
  {
    title: "Back to School Service",
    description: "Praying for students returning to school",
    image_url:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=800&fit=crop&q=80",
    alt_text: "Back to school service",
    orientation: "landscape",
    category: "Services",
    featured: true,
    display_order: 36,
    created_at: getDateForMonth(8, 5),
  },
  {
    title: "Fellowship Dinner",
    description: "Community members enjoying fellowship",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=1200&fit=crop&q=80",
    alt_text: "Fellowship dinner",
    orientation: "portrait",
    category: "Events",
    featured: false,
    display_order: 37,
    created_at: getDateForMonth(8, 10),
  },
  {
    title: "Prayer Meeting",
    description: "Mid-week prayer meeting",
    image_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&q=80",
    alt_text: "Prayer meeting",
    orientation: "landscape",
    category: "Services",
    featured: false,
    display_order: 38,
    created_at: getDateForMonth(8, 15),
  },
  {
    title: "Children's Ministry",
    description: "Children's ministry activities",
    image_url:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=800&fit=crop&q=80",
    alt_text: "Children's ministry",
    orientation: "square",
    category: "Education",
    featured: false,
    display_order: 39,
    created_at: getDateForMonth(8, 20),
  },
  {
    title: "Worship Night",
    description: "Special worship night service",
    image_url:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=1200&fit=crop&q=80",
    alt_text: "Worship night",
    orientation: "portrait",
    category: "Services",
    featured: true,
    display_order: 40,
    created_at: getDateForMonth(8, 25),
  },

  // September (5 images)
  {
    title: "Fall Service",
    description: "Sunday service in fall",
    image_url:
      "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=1200&h=800&fit=crop&q=80",
    alt_text: "Fall service",
    orientation: "landscape",
    category: "Services",
    featured: false,
    display_order: 41,
    created_at: getDateForMonth(9, 5),
  },
  {
    title: "Harvest Festival",
    description: "Church harvest festival celebration",
    image_url:
      "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&h=1200&fit=crop&q=80",
    alt_text: "Harvest festival",
    orientation: "portrait",
    category: "Events",
    featured: true,
    display_order: 42,
    created_at: getDateForMonth(9, 10),
  },
  {
    title: "Sunday School",
    description: "Sunday school classes",
    image_url:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop&q=80",
    alt_text: "Sunday school",
    orientation: "landscape",
    category: "Education",
    featured: false,
    display_order: 43,
    created_at: getDateForMonth(9, 15),
  },
  {
    title: "Men's Breakfast",
    description: "Men's fellowship breakfast",
    image_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&q=80",
    alt_text: "Men's breakfast",
    orientation: "square",
    category: "Events",
    featured: false,
    display_order: 44,
    created_at: getDateForMonth(9, 20),
  },
  {
    title: "Pastor Teaching",
    description: "Pastor teaching the congregation",
    image_url:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=1200&fit=crop&q=80",
    alt_text: "Pastor teaching",
    orientation: "portrait",
    category: "Services",
    featured: false,
    display_order: 45,
    created_at: getDateForMonth(9, 25),
  },

  // October (5 images)
  {
    title: "October Service",
    description: "Sunday morning service",
    image_url:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop&q=80",
    alt_text: "October service",
    orientation: "landscape",
    category: "Services",
    featured: false,
    display_order: 46,
    created_at: getDateForMonth(10, 5),
  },
  {
    title: "Fall Festival",
    description: "Church fall festival event",
    image_url:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=1200&fit=crop&q=80",
    alt_text: "Fall festival",
    orientation: "portrait",
    category: "Events",
    featured: true,
    display_order: 47,
    created_at: getDateForMonth(10, 10),
  },
  {
    title: "Youth Meeting",
    description: "Youth group meeting",
    image_url:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&q=80",
    alt_text: "Youth meeting",
    orientation: "landscape",
    category: "Events",
    featured: false,
    display_order: 48,
    created_at: getDateForMonth(10, 15),
  },
  {
    title: "Bible Study",
    description: "Group Bible study session",
    image_url:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=800&fit=crop&q=80",
    alt_text: "Bible study",
    orientation: "square",
    category: "Education",
    featured: false,
    display_order: 49,
    created_at: getDateForMonth(10, 20),
  },
  {
    title: "Worship Team",
    description: "Worship team leading praise",
    image_url:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=1200&fit=crop&q=80",
    alt_text: "Worship team",
    orientation: "portrait",
    category: "Services",
    featured: false,
    display_order: 50,
    created_at: getDateForMonth(10, 25),
  },

  // November (5 images)
  {
    title: "Thanksgiving Service",
    description: "Thanksgiving celebration service",
    image_url:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=800&fit=crop&q=80",
    alt_text: "Thanksgiving service",
    orientation: "landscape",
    category: "Services",
    featured: true,
    display_order: 51,
    created_at: getDateForMonth(11, 5),
  },
  {
    title: "Thanksgiving Dinner",
    description: "Church Thanksgiving dinner",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=1200&fit=crop&q=80",
    alt_text: "Thanksgiving dinner",
    orientation: "portrait",
    category: "Events",
    featured: true,
    display_order: 52,
    created_at: getDateForMonth(11, 10),
  },
  {
    title: "November Service",
    description: "Regular Sunday service",
    image_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&q=80",
    alt_text: "November service",
    orientation: "landscape",
    category: "Services",
    featured: false,
    display_order: 53,
    created_at: getDateForMonth(11, 15),
  },
  {
    title: "Prayer Gathering",
    description: "Community prayer gathering",
    image_url:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=800&fit=crop&q=80",
    alt_text: "Prayer gathering",
    orientation: "square",
    category: "Services",
    featured: false,
    display_order: 54,
    created_at: getDateForMonth(11, 20),
  },
  {
    title: "Fellowship Event",
    description: "Church fellowship event",
    image_url:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=1200&fit=crop&q=80",
    alt_text: "Fellowship event",
    orientation: "portrait",
    category: "Events",
    featured: false,
    display_order: 55,
    created_at: getDateForMonth(11, 25),
  },

  // December (5 images)
  {
    title: "Christmas Service",
    description: "Christmas celebration service",
    image_url:
      "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=1200&h=800&fit=crop&q=80",
    alt_text: "Christmas service",
    orientation: "landscape",
    category: "Services",
    featured: true,
    display_order: 56,
    created_at: getDateForMonth(12, 5),
  },
  {
    title: "Christmas Celebration",
    description: "Christmas celebration event",
    image_url:
      "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=800&h=1200&fit=crop&q=80",
    alt_text: "Christmas celebration",
    orientation: "portrait",
    category: "Events",
    featured: true,
    display_order: 57,
    created_at: getDateForMonth(12, 10),
  },
  {
    title: "Advent Service",
    description: "Advent season service",
    image_url:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop&q=80",
    alt_text: "Advent service",
    orientation: "landscape",
    category: "Services",
    featured: false,
    display_order: 58,
    created_at: getDateForMonth(12, 15),
  },
  {
    title: "New Year's Eve Service",
    description: "Celebrating the end of the year",
    image_url:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=800&fit=crop&q=80",
    alt_text: "New Year's Eve service",
    orientation: "square",
    category: "Services",
    featured: true,
    display_order: 59,
    created_at: getDateForMonth(12, 20),
  },
  {
    title: "Year End Service",
    description: "Final service of the year",
    image_url:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=1200&fit=crop&q=80",
    alt_text: "Year end service",
    orientation: "portrait",
    category: "Services",
    featured: false,
    display_order: 60,
    created_at: getDateForMonth(12, 25),
  },
];

export async function POST(request: NextRequest) {
  try {
    // Check if gallery table is empty
    const { data: existingData, error: checkError } = await supabaseServer
      .from("gallery")
      .select("id")
      .limit(1);

    if (checkError) {
      console.error("Error checking gallery:", checkError);
      return NextResponse.json(
        { error: "Failed to check gallery table" },
        { status: 500 }
      );
    }

    if (existingData && existingData.length > 0) {
      return NextResponse.json(
        {
          message:
            "Gallery already contains data. Clear existing data first if you want to re-migrate.",
          existingCount: existingData.length,
        },
        { status: 200 }
      );
    }

    // Insert sample images
    const { data, error } = await supabaseServer
      .from("gallery")
      .insert(SAMPLE_GALLERY_IMAGES)
      .select();

    if (error) {
      console.error("Error inserting gallery images:", error);
      return NextResponse.json(
        { error: "Failed to insert gallery images", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Successfully inserted ${data?.length || 0} gallery images`,
        count: data?.length || 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/gallery/migrate:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET - Check migration status
export async function GET() {
  try {
    const { count, error } = await supabaseServer
      .from("gallery")
      .select("*", { count: "exact", head: true });

    if (error) {
      return NextResponse.json(
        { error: "Failed to check gallery status" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      imageCount: count || 0,
      needsMigration: (count || 0) === 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
