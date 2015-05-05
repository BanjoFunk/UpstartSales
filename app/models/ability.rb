class Ability
  include CanCan::Ability

  def initialize(current_user=nil)
    can :create, User
    if current_user
      can :manage, Customer
      can :manage, User, :id => current_user.id

      if current_user.has_role?(:admin)
        can :manage, :all
        can :manage, :admin
      end

      if current_user.has_role?(:brewer)
      end

      if current_user.has_role?(:sales)
      end
    end
  end

  def as_json
    abilities = {}
    rules.each do |rule|
      rule.actions.each do |action|
        abilities[action] ||= {}
        rule.subjects.map {|subject| abilities[action][subject] = rule.base_behavior}
      end
    end
    abilities
  end
end
