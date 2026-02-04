"""
Orchestrator - Executes agent plans created by Team Lead Brain

New Flow:
1. Team Lead Brain decides which agents to run
2. Orchestrator executes them in the correct order
3. Each agent receives results from previous agents

Old Flow (Phase 1) is still available for backward compatibility.
"""

from typing import Dict, Any
from backend.agents.team_lead_brain import create_execution_plan, ExecutionPlan
from backend.core.agent_registry import get_agent_function
from backend.agents.planner import planner_agent
from backend.agents.coder import code_agent


def run_agents_v2(
    user_idea: str,
    mode: str = "full"
) -> Dict[str, Any]:
    """
    Phase 2: Team Lead Brain-driven execution
    
    Args:
        user_idea: User's project description
        mode: Execution mode ("simple", "full", "production")
        
    Returns:
        Dict with execution results from all agents
    """
    print(f"\n{'='*60}")
    print(f"[BRAIN] TEAM LEAD BRAIN - Analyzing project...")
    print(f"{'='*60}\n")
    
    # Step 1: Team Lead Brain creates the execution plan
    plan: ExecutionPlan = create_execution_plan(user_idea, mode=mode)
    
    print(f"[PLAN] Execution Plan:")
    print(f"   Type: {plan.project_type}")
    print(f"   Complexity: {plan.complexity}")
    print(f"   Agents: {', '.join(plan.agents)}")
    print(f"   Order: {' -> '.join(plan.execution_order)}")
    print(f"   Config: {plan.config.model_dump()}")
    print()
    
    # Step 2: Execute agents in order
    print(f"\n{'='*60}")
    print(f"[EXEC] ORCHESTRATOR - Executing agents...")
    print(f"{'='*60}\n")
    
    results = {
        "input_idea": user_idea,
        "execution_plan": plan.model_dump(),
        "agent_outputs": {}
    }
    
    for agent_name in plan.execution_order:
        print(f"[AGENT] Running agent: {agent_name}...")
        
        try:
            # Get agent function from registry
            agent_func = get_agent_function(agent_name)
            
            # Execute agent with appropriate inputs
            if agent_name == "planner":
                output = agent_func(user_idea)
            elif agent_name == "db_schema":
                # DB Schema needs planner output
                architecture = results["agent_outputs"].get("planner", {})
                output = agent_func(architecture)
            elif agent_name == "auth":
                # Auth needs db_schema output
                db_schema = results["agent_outputs"].get("db_schema", {})
                output = agent_func({"db_schema": db_schema, "mode": mode})
            elif agent_name == "coder":
                # Coder needs architecture from planner
                architecture = results["agent_outputs"].get("planner", {})
                output = agent_func(architecture)
            elif agent_name == "tester":
                # Tester needs auth and db_schema outputs
                auth_output = results["agent_outputs"].get("auth", {})
                db_schema = results["agent_outputs"].get("db_schema", {})
                output = agent_func({"auth": auth_output, "db_schema": db_schema})
            elif agent_name == "deployer":
                # Deployer gets full context
                output = agent_func({"mode": mode, "results": results})
            else:
                # Future agents will get context from results
                output = {"status": "pending", "message": f"{agent_name} not yet implemented"}
            
            results["agent_outputs"][agent_name] = output
            print(f"   [OK] {agent_name} completed\n")
            
        except Exception as e:
            print(f"   [FAIL] {agent_name} failed: {e}\n")
            results["agent_outputs"][agent_name] = {"error": str(e)}
    
    print(f"\n{'='*60}")
    print(f"[DONE] Orchestration Complete")
    print(f"{'='*60}\n")
    
    return results


def run_agents(user_idea: str) -> Dict[str, Any]:
    """
    Phase 1: Original flow (backward compatibility)
    
    Simple pipeline: planner → coder
    """
    print("\n⚠️  Using legacy Phase 1 flow (planner → coder)")
    print("   Upgrade to run_agents_v2() for Phase 2 features\n")
    
    architecture = planner_agent(user_idea)
    project_structure = code_agent(architecture)

    return {
        "input_idea": user_idea,
        "architecture": architecture,
        "project_structure": project_structure
    }


# ========== PUBLIC API ==========

def orchestrate(
    user_idea: str,
    mode: str = "full",
    use_v2: bool = True
) -> Dict[str, Any]:
    """
    Main orchestration entry point.
    
    Args:
        user_idea: User's project description
        mode: Execution mode (simple/full/production)
        use_v2: Use Phase 2 (Team Lead Brain) or Phase 1
        
    Returns:
        Dict with all execution results
    """
    if use_v2:
        return run_agents_v2(user_idea, mode=mode)
    else:
        return run_agents(user_idea)
