using MeetPoint.API.Constants;
using MeetPoint.API.Dtos.Common;
using MeetPoint.API.Dtos.Memberships;
using MeetPoint.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MeetPoint.API.Controllers
{
	[Route("api/memberships")]
	[ApiController]
	public class MembershipsController : ControllerBase
	{
		private readonly IMembershipsService _membershipsService;

		public MembershipsController(IMembershipsService membershipsService)
        {
			this._membershipsService = membershipsService;
		}

		[HttpPost]
		[Authorize(Roles = $"{RolesConstant.USER}, {RolesConstant.ADMIN}, {RolesConstant.ORGANIZER}")]
		public async Task<ActionResult<ResponseDto<MembershipDto>>> AddMembership(MembershipCreateDto dto)
		{
			var response = await _membershipsService.AddMembershipAsync(dto);
			return StatusCode(response.StatusCode, response);
		}

		[HttpGet("state/{userId}")]
		[Authorize(Roles = $"{RolesConstant.USER}, {RolesConstant.ADMIN}, {RolesConstant.ORGANIZER}")]
		public async Task<ActionResult<ResponseDto<bool>>> GetMembershipStateById(string userId)
		{
			var response = await _membershipsService.GetMembershipStateByIdAsync(userId);
			return StatusCode(response.StatusCode, response);
		}
	}
}
