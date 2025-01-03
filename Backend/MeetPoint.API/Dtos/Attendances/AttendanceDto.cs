﻿using MeetPoint.API.Database.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using MeetPoint.API.Dtos.Memberships;

namespace MeetPoint.API.Dtos.Attendances
{
	public class AttendanceDto
	{
		public Guid Id { get; set; }
		public string UserId { get; set; }
		public string UserName { get; set; }
		public MembershipDto UserMembership { get; set; }
		public Guid EventId { get; set; }
		public string EventTitle { get; set; }
		public string State { get; set; }
	}
}
